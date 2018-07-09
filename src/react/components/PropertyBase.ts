import { SomeNode } from "link-lib";
import * as ReactPropTypes from "prop-types";
import { NamedNode, SomeTerm, Statement } from "rdflib";
import { ReactElement } from "react";
import * as React from "react";

import { labelType, linkedPropType, subjectType } from "../../propTypes";
import { LabelType, LinkContextRecieverProps } from "../../types";

export interface PropTypes extends LinkContextRecieverProps {
    label: LabelType;
    linkedProp?: SomeTerm;
}

export class PropertyBase<T = {}> extends React.Component<T & PropTypes> {
    // public static propTypes = {
    //     label: labelType,
    //     linkedProp: linkedPropType,
    //     subject: subjectType,
    //     version: ReactPropTypes.string,
    // };

    public render(): ReactElement<any> | null {
        const prop = this.getLinkedObjectProperty();

        return React.createElement(
            "span",
            null,
            `PropBase: ${prop && prop.value}`,
        );
    }

    public shouldComponentUpdate(nextProps: PropTypes) {
        if (nextProps.label === undefined) {
            return false;
        }

        return this.props.subject !== nextProps.subject ||
            this.props.version !== nextProps.version;
    }

    protected getLinkedObjectProperty(property?: NamedNode): SomeTerm | undefined {
        if (property === undefined && typeof this.props.linkedProp !== "undefined") {
            return this.props.linkedProp;
        }

        return this.props.lrs.getResourceProperty(
            this.props.subject,
            property || this.props.label,
        );
    }

    protected getLinkedObjectPropertyRaw(property?: SomeNode): Statement[] {
        return this.props.lrs.getResourcePropertyRaw(
            this.props.subject,
            property || this.props.label,
        );
    }
}

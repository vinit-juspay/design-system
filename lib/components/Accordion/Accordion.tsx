import * as React from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { forwardRef } from 'react';
import { AccordionProps, AccordionType } from './types';
import { getAccordionRootClassNames } from './utils';

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      children,
      accordionType = AccordionType.BORDER,
      defaultValue,
      value,
      isCollapsible = true,
      isMultiple = false,
      onValueChange,
      className,
    },
    ref
  ) => {
    const rootClassName = getAccordionRootClassNames(accordionType, className);

    const baseProps = {
      collapsible: isCollapsible,
      className: rootClassName,
      ref: ref,
    };

    return isMultiple ? (
      <RadixAccordion.Root
        type="multiple"
        value={value as string[] | undefined}
        defaultValue={defaultValue as string[] | undefined}
        onValueChange={onValueChange as ((value: string[]) => void) | undefined}
        {...baseProps}
      >
        {renderChildren()}
      </RadixAccordion.Root>
    ) : (
      <RadixAccordion.Root
        type="single"
        value={value as string | undefined}
        defaultValue={defaultValue as string | undefined}
        onValueChange={onValueChange as ((value: string) => void) | undefined}
        {...baseProps}
      >
        {renderChildren()}
      </RadixAccordion.Root>
    );

    function renderChildren() {
      return React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child;

        const childProps = {
          ...(child.props as object),
          accordionType: accordionType,
        };

        return React.cloneElement(child, childProps);
      });
    }
  }
);

Accordion.displayName = 'Accordion';

export default Accordion;

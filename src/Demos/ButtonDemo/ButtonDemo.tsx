import React from 'react';
import { Button } from '../../../lib/main';
import { ButtonType, ButtonSize, ButtonSubType } from '../../../lib/components/Button/types';
import { Search, Plus, ArrowRight, Trash2, Check, MenuIcon, Settings } from 'lucide-react';

const ButtonDemo = () => {
  return (
    <>
      <h2 className="text-2xl font-semibold">Button Examples</h2>
      <div>ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Button Types</h3>
        <div className="flex flex-wrap gap-4">
          <Button buttonType={ButtonType.PRIMARY}>Primary Button</Button>
          <Button buttonType={ButtonType.SECONDARY}>Secondary Button</Button>
          <Button buttonType={ButtonType.DANGER}>Danger Button</Button>
          <Button buttonType={ButtonType.SUCCESS}>Success Button</Button>
        </div>
      </div>

      {/* Button Sizes */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Button Sizes</h3>
        <div className="flex flex-wrap gap-4 items-center">
          <Button buttonType={ButtonType.PRIMARY} size={ButtonSize.SMALL}>
            Small Button
          </Button>
          <Button buttonType={ButtonType.PRIMARY} size={ButtonSize.MEDIUM}>
            Medium Button
          </Button>
          <Button buttonType={ButtonType.PRIMARY} size={ButtonSize.LARGE}>
            Large Button
          </Button>
          <Button buttonType={ButtonType.PRIMARY} onClick={() => console.log('Button clicked!')}>
            Click Me
          </Button>
        </div>
      </div>

      {/* Buttons with Icons */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Buttons with Icons</h3>
        <div className="flex flex-wrap gap-4">
          <Button buttonType={ButtonType.PRIMARY} leadingIcon={Search}>
            Search
          </Button>
          <Button buttonType={ButtonType.PRIMARY} trailingIcon={ArrowRight}>
            Next
          </Button>
          <Button buttonType={ButtonType.PRIMARY} leadingIcon={Search} trailingIcon={ArrowRight}>
            Search & Go
          </Button>
        </div>
      </div>

      {/* Icon Only Buttons */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Icon Only Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <Button
            buttonType={ButtonType.PRIMARY}
            subType={ButtonSubType.ICON_ONLY}
            leadingIcon={Plus}
            aria-label="Add item"
          />
          <Button
            buttonType={ButtonType.SECONDARY}
            subType={ButtonSubType.ICON_ONLY}
            leadingIcon={Search}
            aria-label="Search"
          />
          <Button
            buttonType={ButtonType.DANGER}
            subType={ButtonSubType.ICON_ONLY}
            leadingIcon={Trash2}
            aria-label="Delete"
          />
          <Button
            buttonType={ButtonType.SUCCESS}
            subType={ButtonSubType.ICON_ONLY}
            leadingIcon={Check}
            aria-label="Approve"
          />
        </div>
      </div>

      {/* Link Buttons */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Link Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <Button buttonType={ButtonType.PRIMARY} subType={ButtonSubType.LINK}>
            Primary Link
          </Button>
          <Button buttonType={ButtonType.SECONDARY} subType={ButtonSubType.LINK}>
            Secondary Link
          </Button>
          <Button buttonType={ButtonType.DANGER} subType={ButtonSubType.LINK}>
            Danger Link
          </Button>
          <Button buttonType={ButtonType.SUCCESS} subType={ButtonSubType.LINK}>
            Success Link
          </Button>
        </div>
      </div>

      {/* Button States */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Button States</h3>
        <div className="flex flex-wrap gap-4">
          <Button buttonType={ButtonType.PRIMARY} isLoading={true}>
            Loading
          </Button>
          <Button buttonType={ButtonType.PRIMARY} isDisabled={true}>
            Disabled
          </Button>
        </div>
      </div>

      {/* Accessibility Examples */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Accessibility Examples</h3>
        <div className="flex flex-wrap gap-4">
          <Button
            buttonType={ButtonType.SECONDARY}
            subType={ButtonSubType.ICON_ONLY}
            leadingIcon={MenuIcon}
            ariaLabel="Open menu"
            ariaExpanded={false}
            ariaControls="main-menu"
            ariaHasPopup="menu"
          />

          <Button buttonType={ButtonType.PRIMARY} ariaPressed={true}>
            Selected Option
          </Button>

          <Button buttonType={ButtonType.PRIMARY} ariaPressed={false}>
            Unselected Option
          </Button>

          <Button
            buttonType={ButtonType.SECONDARY}
            leadingIcon={Settings}
            ariaControls="settings-panel"
            ariaExpanded={false}
          >
            Settings
          </Button>
        </div>
      </div>
    </>
  );
};

export default ButtonDemo; 
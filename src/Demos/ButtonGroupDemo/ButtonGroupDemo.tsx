import React from 'react';
import { Button, ButtonGroup } from '../../../lib/main';
import { ButtonType } from '../../../lib/components/Button/types';
import { ButtonGroupSize, ButtonGroupMode } from '../../../lib/components/ButtonGroup/types';

const ButtonGroupDemo = () => {
  return (
    <>
      <h2 className="text-2xl font-semibold">Button Group Examples</h2>

      {/* Basic Button Groups */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Basic Button Groups</h3>
        <div className="flex flex-col gap-4">
          <ButtonGroup size={ButtonGroupSize.MEDIUM}>
            <Button buttonType={ButtonType.PRIMARY} text="Button 1" />
            <Button buttonType={ButtonType.PRIMARY} text="Button 2" />
          </ButtonGroup>

          <ButtonGroup size={ButtonGroupSize.MEDIUM}>
            <Button buttonType={ButtonType.PRIMARY} text="Button 1" />
            <Button buttonType={ButtonType.PRIMARY} text="Button 2" />
            <Button buttonType={ButtonType.PRIMARY} text="Button 3" />
          </ButtonGroup>

          <ButtonGroup size={ButtonGroupSize.MEDIUM}>
            <Button buttonType={ButtonType.PRIMARY} text="Button 1" />
            <Button buttonType={ButtonType.PRIMARY} text="Button 2" />
            <Button buttonType={ButtonType.PRIMARY} text="Button 3" />
            <Button buttonType={ButtonType.PRIMARY} text="Button 4" />
          </ButtonGroup>
        </div>
      </div>

      {/* Non-Stacked Button Groups */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Non-Stacked Button Groups</h3>
        <div className="flex flex-col gap-4">
          <ButtonGroup size={ButtonGroupSize.MEDIUM} isStacked={false}>
            <Button buttonType={ButtonType.PRIMARY} text="Button 1" />
            <Button buttonType={ButtonType.PRIMARY} text="Button 2" />
          </ButtonGroup>

          <ButtonGroup size={ButtonGroupSize.MEDIUM} isStacked={false}>
            <Button buttonType={ButtonType.PRIMARY} text="Button 1" />
            <Button buttonType={ButtonType.PRIMARY} text="Button 2" />
            <Button buttonType={ButtonType.PRIMARY} text="Button 3" />
          </ButtonGroup>
        </div>
      </div>

      {/* Button Group Sizes */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Button Group Sizes</h3>
        <div className="flex flex-col gap-4">
          <ButtonGroup size={ButtonGroupSize.SMALL}>
            <Button buttonType={ButtonType.PRIMARY} text="Small 1" />
            <Button buttonType={ButtonType.PRIMARY} text="Small 2" />
            <Button buttonType={ButtonType.PRIMARY} text="Small 3" />
          </ButtonGroup>

          <ButtonGroup size={ButtonGroupSize.MEDIUM}>
            <Button buttonType={ButtonType.PRIMARY} text="Medium 1" />
            <Button buttonType={ButtonType.PRIMARY} text="Medium 2" />
            <Button buttonType={ButtonType.PRIMARY} text="Medium 3" />
          </ButtonGroup>

          <ButtonGroup size={ButtonGroupSize.LARGE}>
            <Button buttonType={ButtonType.PRIMARY} text="Large 1" />
            <Button buttonType={ButtonType.PRIMARY} text="Large 2" />
            <Button buttonType={ButtonType.PRIMARY} text="Large 3" />
          </ButtonGroup>
        </div>
      </div>

      {/* Button Type Control Modes */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Button Type Control Modes</h3>

        <div className="mb-4">
          <h4 className="text-lg font-medium mb-2">Single Primary Mode (Default)</h4>
          <p className="text-gray-600 mb-2">
            Only the first non-secondary button keeps its type, others become secondary
          </p>
          <ButtonGroup mode={ButtonGroupMode.SINGLE_PRIMARY}>
            <Button buttonType={ButtonType.PRIMARY} text="Primary (kept)" />
            <Button buttonType={ButtonType.DANGER} text="Now Secondary" />
            <Button buttonType={ButtonType.SUCCESS} text="Now Secondary" />
          </ButtonGroup>
        </div>

        <div className="mb-4">
          <h4 className="text-lg font-medium mb-2">No Transform Mode</h4>
          <p className="text-gray-600 mb-2">Each button keeps its original button type</p>
          <ButtonGroup mode={ButtonGroupMode.NO_TRANSFORM}>
            <Button buttonType={ButtonType.PRIMARY} text="Primary" />
            <Button buttonType={ButtonType.DANGER} text="Danger" />
            <Button buttonType={ButtonType.SUCCESS} text="Success" />
          </ButtonGroup>
        </div>

        <div className="mb-4">
          <h4 className="text-lg font-medium mb-2">All Secondary Mode</h4>
          <p className="text-gray-600 mb-2">Forces all buttons to be secondary type</p>
          <ButtonGroup mode={ButtonGroupMode.ALL_SECONDARY}>
            <Button buttonType={ButtonType.PRIMARY} text="Now Secondary" />
            <Button buttonType={ButtonType.DANGER} text="Now Secondary" />
            <Button buttonType={ButtonType.SUCCESS} text="Now Secondary" />
          </ButtonGroup>
        </div>
      </div>

      {/* Mixed Button Types */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Mixed Button Types</h3>
        <div className="flex flex-col gap-4">
          <ButtonGroup size={ButtonGroupSize.MEDIUM}>
            <Button buttonType={ButtonType.PRIMARY} text="Primary" />
            <Button buttonType={ButtonType.SECONDARY} text="Secondary" />
            <Button buttonType={ButtonType.DANGER} text="Danger" />
          </ButtonGroup>

          <ButtonGroup size={ButtonGroupSize.MEDIUM} isStacked={true}>
            <Button buttonType={ButtonType.PRIMARY} text="Primary" />
            <Button buttonType={ButtonType.SECONDARY} text="Secondary" />
            <Button buttonType={ButtonType.SUCCESS} text="Success" />
          </ButtonGroup>
        </div>
      </div>
    </>
  );
};

export default ButtonGroupDemo; 
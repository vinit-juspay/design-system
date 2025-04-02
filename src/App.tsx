import Button from "./components/Button";
import Checkbox from "./components/Checkbox";

const App = () => {
  return (
    <div className="p-8 space-y-12">
      <div>
        <h2 className="text-xl font-bold mb-4">Buttons</h2>
        <div className="flex gap-4 flex-wrap">
          <Button type="primary" size="medium">Primary Button</Button>
          <Button type="secondary" size="medium">Secondary Button</Button>
          <Button type="danger" size="medium">Danger Button</Button>
          <Button type="success" size="medium">Success Button</Button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Checkboxes</h2>
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">States</h3>
            <div className="flex gap-8 flex-wrap">
              <Checkbox 
                state="unselected" 
                labelText="Unselected" 
              />
              <Checkbox 
                state="selected" 
                labelText="Selected" 
              />
              <Checkbox 
                state="intermediate" 
                labelText="Intermediate" 
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Sizes</h3>
            <div className="flex gap-8 flex-wrap">
              <Checkbox 
                size="sm" 
                labelText="Small checkbox" 
              />
              <Checkbox 
                size="md" 
                labelText="Medium checkbox" 
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">With Subtext</h3>
            <div className="flex gap-8 flex-wrap">
              <Checkbox 
                labelText="Remember Me" 
                hasSubtext={true}
                subtext="Save my login details for next time."
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Disabled</h3>
            <div className="flex gap-8 flex-wrap">
              <Checkbox 
                enabled={false}
                labelText="Disabled checkbox" 
              />
              <Checkbox 
                enabled={false}
                state="selected"
                labelText="Disabled selected" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

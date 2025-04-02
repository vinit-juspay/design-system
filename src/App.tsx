import Button from "./components/Button";

const App = () => {
  return (
    <div className="p-4 space-y-4 flex gap-4 justify-center items-center">
      <Button type="primary" size="medium">Primary Button</Button>
      <Button type="secondary" size="medium">Secondary Button</Button>
      <Button type="danger" size="medium">Danger Button</Button>
      <Button type="success" size="medium">Success Button</Button>
    </div>
  );
};

export default App;

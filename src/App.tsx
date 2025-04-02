import { ButtonPreview, CheckboxPreview } from "./preview";
import { useState } from "react";

/**
 * Sidebar component for design system navigation
 */
const Sidebar = () => {
  const [activeSection, setActiveSection] = useState('components');
  const [activeComponent, setActiveComponent] = useState('buttons');

  const sections = [
    {
      id: 'getting-started',
      name: 'Getting Started',
      items: [
        { id: 'introduction', name: 'Introduction' },
        { id: 'installation', name: 'Installation' },
      ]
    },
    {
      id: 'foundations',
      name: 'Foundations',
      items: [
        { id: 'colors', name: 'Colors' },
        { id: 'typography', name: 'Typography' },
        { id: 'spacing', name: 'Spacing' },
        { id: 'shadows', name: 'Shadows' },
      ]
    },
    {
      id: 'components',
      name: 'Components',
      items: [
        { id: 'buttons', name: 'Buttons' },
        { id: 'checkboxes', name: 'Checkboxes' },
      ]
    }
  ];

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    // Set first item in section as active
    const firstItem = sections.find(section => section.id === sectionId)?.items[0];
    if (firstItem) {
      setActiveComponent(firstItem.id);
    }
  };

  const handleComponentClick = (componentId: string) => {
    setActiveComponent(componentId);
    // Smooth scroll to component section
    const element = document.getElementById(componentId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-6">
        <nav className="space-y-8">
          {sections.map((section) => (
            <div key={section.id} className="space-y-2">
              <button
                onClick={() => handleSectionClick(section.id)}
                className={`text-sm font-medium w-full text-left flex items-center ${
                  activeSection === section.id ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {section.name}
              </button>
              {activeSection === section.id && (
                <ul className="pl-4 space-y-1 border-l border-gray-200">
                  {section.items.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => handleComponentClick(item.id)}
                        className={`block text-sm py-1 ${
                          activeComponent === item.id
                            ? 'text-primary-600 font-medium'
                            : 'text-gray-500 hover:text-gray-900'
                        }`}
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

/**
 * Main App component
 * Displays all component previews from the design system
 */
const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-6 px-2">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Juspay Design System</h1>
          <p className="text-gray-500 mt-1">Component library and design tokens</p>
        </div>
      </header>

      {/* Main content with sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto py-12 px-6">
            <div className="space-y-16">
              {/* Components section */}
              <section>
                <div className="border-b border-gray-200 pb-2 mb-8">
                  <h2 className="text-xl font-bold text-gray-900">Components</h2>
                  <p className="text-gray-500 text-sm mt-1">Reusable UI building blocks</p>
                </div>

                {/* Components previews */}
                <div className="space-y-12">
                  <div id="buttons" className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-bold mb-6 text-gray-800">Buttons</h2>
                    <ButtonPreview />
                  </div>

                  <div id="checkboxes" className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-bold mb-6 text-gray-800">Checkboxes</h2>
                    <CheckboxPreview />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Design System</p>
        </div>
      </footer>
    </div>
  );
};

export default App;

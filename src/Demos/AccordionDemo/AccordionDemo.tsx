import { Accordion, AccordionItem, AccordionType } from '../../../lib/components/Accordion';
import { Info, AlertCircle, Settings, Lock, User, Bell, HelpCircle } from 'lucide-react';
import { AccordionChevronPosition } from '../../../lib/components/Accordion/types';

const AccordionDemo = () => {
  return (
    <div className="space-y-10">
      <h2 className="text-2xl font-semibold">Accordions</h2>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">No Border Accordion (Default)</h3>
        <Accordion defaultValue="item-1" type={AccordionType.NO_BORDER}>
          <AccordionItem
            value="item-1"
            title="Basic Information"
            subtext="Personal and account details"
            leftSlot={<Info className="text-blue-600 h-3.5 w-3.5" />}
          >
            <div className="space-y-4">
              <p className="text-gray-600">
                This section contains all your basic profile information, including name, email, and
                account preferences. You can update these details at any time.
              </p>
            </div>
          </AccordionItem>

          <AccordionItem
            value="item-2"
            title="Security Settings"
            subtext="Password and authentication options"
            leftSlot={<Lock className="text-green-600 h-3.5 w-3.5" />}
          >
            <div className="space-y-4">
              <p className="text-gray-600">Manage your security preferences:</p>
              <ul className="list-disc pl-5 text-gray-600">
                <li>Change password</li>
                <li>Setup two-factor authentication</li>
                <li>Manage connected devices</li>
              </ul>
            </div>
          </AccordionItem>

          <AccordionItem
            value="item-3"
            title="Notifications"
            subtext="Email and push notification preferences"
            isDisabled={true}
          >
            <p className="text-gray-600">
              Control which notifications you receive and how they are delivered. You can customize
              notifications for updates, messages, and system alerts.
            </p>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Border Accordion</h3>
        <Accordion defaultValue="border-1" type={AccordionType.BORDER}>
          <AccordionItem
            value="border-1"
            title="How do I create an account?"
            leftSlot={<User className="h-3.5 w-3.5" />}
          >
            <p className="text-gray-600">
              To create an account, click the "Sign Up" button in the top right corner and follow
              the instructions. You'll need to provide a valid email address and create a secure
              password.
            </p>
          </AccordionItem>

          <AccordionItem
            value="border-2"
            title="What payment methods do you accept?"
            leftSlot={<AlertCircle className="h-3.5 w-3.5" />}
            subtext="Information about our supported payment options"
          >
            <div className="space-y-2">
              <p className="text-gray-600">We accept the following payment methods:</p>
              <ul className="list-disc pl-5 text-gray-600">
                <li>Credit/Debit Cards (Visa, Mastercard, Amex)</li>
                <li>PayPal</li>
                <li>Bank Transfer</li>
                <li>Apple Pay / Google Pay</li>
              </ul>
            </div>
          </AccordionItem>

          <AccordionItem
            value="border-3"
            title="How do I contact customer support?"
            subtext="Choose the right plan for your needs"
            isDisabled={true}
            leftSlot={<HelpCircle className="h-3.5 w-3.5 text-gray-500" />}
          >
            <p className="text-gray-600">
              This content is not accessible because the item is disabled.
            </p>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">left acccordion</h3>
        <Accordion isMultiple defaultValue={['multi-1', 'multi-3']} type={AccordionType.BORDER}>
          <AccordionItem
            value="multi-1"
            title="Product Features"
            leftSlot={<Settings className="h-3.5 w-3.5" />}
            chevronPosition={AccordionChevronPosition.LEFT}
          >
            <p className="text-gray-600">
              Explore all the features our product has to offer. We provide comprehensive tools for
              productivity, collaboration, and data management.
            </p>
          </AccordionItem>

          <AccordionItem
            value="multi-2"
            title="Subscription Plans"
            subtext="Choose the right plan for your needs"
            chevronPosition={AccordionChevronPosition.LEFT}
          >
            <div className="space-y-2">
              <p className="text-gray-600">We offer several subscription tiers:</p>
              <ul className="list-disc pl-5 text-gray-600">
                <li>Free - Basic access with limited features</li>
                <li>Pro - Advanced features for individuals ($9.99/month)</li>
                <li>Team - Collaboration tools for small teams ($24.99/month)</li>
                <li>Enterprise - Custom solutions for large organizations</li>
              </ul>
            </div>
          </AccordionItem>

          <AccordionItem
            value="multi-3"
            title="System Requirements"
            leftSlot={<Bell className="h-3.5 w-3.5" />}
            chevronPosition={AccordionChevronPosition.LEFT}
          >
            <p className="text-gray-600">
              Our application works on all modern browsers and operating systems. For optimal
              performance, we recommend using Chrome, Firefox, or Safari with at least 4GB RAM and a
              stable internet connection.
            </p>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default AccordionDemo;

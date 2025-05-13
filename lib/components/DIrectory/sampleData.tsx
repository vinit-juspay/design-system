import {
  CalendarIcon,
  AlertCircle,
  BarChart2,
  BellIcon,
  Box,
  ChevronDown,
  FileText,
  FormInput,
  Grid,
  Info,
  Layout,
  List,
  MenuIcon,
  Square,
  TagIcon,
  Users,
  ListFilter,
  Type,
} from "lucide-react"
import { DirectoryData } from "./types"

export const sampleData: DirectoryData[] = [
  {
    label: "Basic Components",
    items: [
      {
        label: "Button",
        leftSlot: <Square className="w-4 h-4" />,
      },
      {
        label: "Button Group",
        leftSlot: <Grid className="w-4 h-4" />,
      },
      {
        label: "Input",
        leftSlot: <FormInput className="w-4 h-4" />,
      },
      {
        label: "Tag",
        leftSlot: <TagIcon className="w-4 h-4" />,
      },
      {
        label: "Avatar",
        leftSlot: <Users className="w-4 h-4" />,
      },
    ],
  },
  {
    label: "Navigation",
    items: [
      {
        label: "Menu",
        leftSlot: <MenuIcon className="w-4 h-4" />,
        items: [
          {
            label: "Item 1",
            leftSlot: <Square className="w-4 h-4" />,
            items: [
              {
                label: "Item 1.1",
                leftSlot: <Square className="w-4 h-4" />,
                items: [
                  {
                    label: "Item 1.1.1",
                    leftSlot: <Square className="w-4 h-4" />,
                  },
                ],
              },
            ],
          },
          {
            label: "Item 2",
            leftSlot: <Square className="w-4 h-4" />,
          },
        ],
      },
      {
        label: "Dropdown",
        leftSlot: <ChevronDown className="w-4 h-4" />,
      },
      {
        label: "Tabs",
        leftSlot: <Layout className="w-4 h-4" />,
      },
      {
        label: "Accordion",
        leftSlot: <List className="w-4 h-4" />,
      },
    ],
  },
  {
    label: "Feedback",
    items: [
      {
        label: "Alert",
        leftSlot: <AlertCircle className="w-4 h-4" />,
      },
      {
        label: "Snackbar",
        leftSlot: <BellIcon className="w-4 h-4" />,
      },
      {
        label: "Tooltip",
        leftSlot: <Info className="w-4 h-4" />,
      },
      {
        label: "Modal",
        leftSlot: <Box className="w-4 h-4" />,
      },
    ],
  },
  {
    label: "Data Display",
    items: [
      {
        label: "Chart",
        leftSlot: <BarChart2 className="w-4 h-4" />,
      },
      {
        label: "Chart V2",
        leftSlot: <BarChart2 className="w-4 h-4" />,
      },
      {
        label: "Stat Card",
        leftSlot: <FileText className="w-4 h-4" />,
      },
    ],
  },
  {
    label: "Form Elements",
    items: [
      {
        label: "Date Picker",
        leftSlot: <CalendarIcon className="w-4 h-4" />,
      },
      {
        label: "Selectors",
        leftSlot: <ListFilter className="w-4 h-4" />,
      },
    ],
  },
  {
    label: "Typography",
    items: [
      {
        label: "Fonts",
        leftSlot: <Type className="w-4 h-4" />,
      },
    ],
  },
]

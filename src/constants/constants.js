export const EVENTS = [
  { id: 1, name: "New order placed" },
  { id: 2, name: "New signup" },
  { id: 3, name: "New subscriber" },
  { id: 4, name: "New cancellation" }
];

export const CONDITIONS = [
  { id: 1, name: "Amount > 100" },
  { id: 2, name: "Amount < 100" },
  { id: 3, name: "Product is Coffee" },
  { id: 4, name: "Product is Tea" },
  { id: 5, name: "Date > Today" },
  { id: 6, name: "Date < Today" }
];
export const ACTIONS = [
  {
    id: 1,
    name: "Send email to Contact",
    type: "email",
    label: "Email address"
  },
  { id: 2, name: "Call Contact", type: "tel", label: "Contact Number" },
  { id: 3, name: "Add Tag to Contact", type: "tel", label: "Contact Number" },
  { id: 4, name: "Remove Contact", type: "tel", label: "Contact Number" }
];

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

export const SAMPLE_EVENT_TRIGGERS = [
  {
    eventKey: "NewOrder",
    eventDisplay: "New order placed",
    fields: [
      {
        conditionKey: "ProductTitle",
        conditionDisplay: "Product Title",
        type: "string"
      },
      {
        conditionKey: "ProductAmount",
        conditionDisplay: "Product Amount",
        type: "int"
      }
    ]
  },
  {
    eventKey: "NewSignup",
    eventDisplay: "New signup",
    fields: [
      {
        conditionKey: "Gender",
        conditionDisplay: "Customer Gender",
        type: "option",
        options: ["Male", "Female"]
      },
      { conditionKey: "DOB", conditionDisplay: "Birthday", type: "date" }
    ]
  }
];

export const SAMPLE_ACTIONS = [
  {
    actionKey: "SendEmail",
    actionDisplay: "Send email to contact",
    fields: [
      { key: "emailAddress", placeHolder: "Email Address", type: "string" }
    ]
  },
  {
    actionKey: "CallContact",
    actionDisplay: "Call contact",
    fields: [
      { key: "callContact", placeHolder: "Contact Number", type: "string" },
      {
        key: "callContactCountry",
        placeHolder: "Country",
        type: "selection",
        option: ["Singapore", "Malaysia"]
      }
    ]
  }
];

export const CONDITION_OPERATORS = [
  { name: "Equal", value: "=", type: "string" },
  { name: "Not equal", value: "!=", type: "string" },
  { name: "Contains", value: "contains", type: "string" },
  { name: "Not contains", value: "not contains", type: "string" },
  { name: "Greater than", value: ">", type: "int" },
  { name: "Less than", value: "<", type: "int" },
  { name: "Greater and equal than", value: ">=", type: "int" },
  { name: "Less and equal than", value: "<=", type: "int" },
  { name: "Equal", value: "=", type: "date" },
  { name: "Earlier than", value: "earlier than", type: "date" },
  { name: "Later than", value: "later than", type: "date" }
];

export const SAMPLE_FLOW = {
  eventKey: "NewOrder",
  conditions: [
    {
      "Fn::If": [
        [
          {
            "Fn::And": [
              {
                conditionKey: "ProductTitle",
                value: ["coke", "pepsi"],
                operator: "contains"
              },
              {
                conditionKey: "ProductAmount",
                value: ["30"],
                operator: ">="
              }
            ]
          }
        ],
        [
          {
            "Fn::If": [
              [
                {
                  conditionKey: "ProductTitle",
                  value: ["coke"],
                  operator: "="
                }
              ],
              [
                {
                  actionKey: "CallContact",
                  actionInputs: [
                    {
                      key: "callContact",
                      value: "999"
                    },
                    {
                      key: "callContactCountry",
                      value: "Singapore"
                    }
                  ]
                }
              ],
              [
                {
                  actionKey: "SendEmail",
                  actionInputs: [
                    {
                      key: "sendEmail",
                      value: "simon@gmail.com"
                    }
                  ]
                }
              ]
            ]
          }
        ],
        [
          {
            actionKey: "CallContact",
            actionInputs: [
              {
                key: "callContact",
                value: "0123456789"
              },
              {
                key: "callContactCountry",
                value: "Malaysia"
              }
            ]
          },
          {
            actionKey: "SendEmail",
            actionInputs: [
              {
                key: "sendEmail",
                value: "hello@gmail.com"
              }
            ]
          }
        ]
      ]
    }
  ]
};

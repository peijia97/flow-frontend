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
                      key: "emailAddress",
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
                key: "emailAddress",
                value: "hello@gmail.com"
              }
            ]
          }
        ]
      ]
    }
  ]
};

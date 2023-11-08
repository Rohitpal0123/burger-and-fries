const roleSchema = {
  type: "object",
  properties: {
    role: {
      type: "string",
      enum: ["manager", "employee", "customer"]
    },
    isActive: {
      type: "boolean"
    }
  },
  required: ["role", "isActive"]
};

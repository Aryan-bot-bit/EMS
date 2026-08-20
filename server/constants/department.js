export const DEPARTMENTS = [
  "Engineering",
  "Human Resources",
  "Marketing",
  "Sales",
  "Finance",
  "Operations",
  "IT Support",
  "Customer Success",
  "Product Management",
  "Design",
];

export const normalizeDepartment = (department) => {
  if (!department) return "Engineering";

  const aliases = {
    HR: "Human Resources",
    "Human Resources": "Human Resources",
    IT: "IT Support",
    "IT Support": "IT Support",
    "Customer Success": "Customer Success",
    "Product Management": "Product Management",
    Design: "Design",
    Engineering: "Engineering",
    Marketing: "Marketing",
    Sales: "Sales",
    Finance: "Finance",
    Operations: "Operations",
  };

  const normalized = aliases[department] || department;
  return DEPARTMENTS.includes(normalized) ? normalized : "Engineering";
};
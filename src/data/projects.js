export const fallbackProjects = [
  {
    id: 1,
    title: "xBankz",
    description: "A secure fintech banking platform with fraud detection and role-based access control.",
    problem: "Users needed a realistic digital banking experience with proper security and transfer controls.",
    solution: "Built a full-stack banking app with OTP authentication, transfer workflows, and automated fraud detection.",
    features: ["OTP login with account lockout", "Internal and interbank transfers with admin approval", "Fraud detection and audit trail logging"],
    tech_stack: ["React", "Flask", "PostgreSQL"],
    image_url: "/images/xbankz.png",
    live_url: "https://project-xbanz-frontend.vercel.app",
    category: "Web Apps",
    featured: true
  },
  {
    id: 2,
    title: "Task Manager App",
    description: "A Flask task and performance management system for tracking appraisals, tasks, notifications, and team productivity.",
    problem: "Teams needed a clearer way to assign tasks, monitor completion, capture appraisal records, and review performance without relying on scattered manual tracking.",
    solution: "Built a Python Flask application with role-based dashboards, task assignment flows, employee appraisal views, notification handling, and reporting/export tools.",
    features: [
      "Admin and employee dashboards",
      "Task assignment, self-assigned tasks, and completion tracking",
      "Employee appraisal records with productivity and rating calculations",
      "Notifications, messaging, and report export workflows"
    ],
    tech_stack: ["Python", "Flask", "SQLite", "SQLAlchemy", "Bootstrap"],
    image_url: "",
    live_url: "https://botswanapost-task-manager.onrender.com",
    category: "Web Apps",
    featured: true
  }
];

export function mergeProjects(apiProjects = []) {
  const projectMap = new Map();

  fallbackProjects.forEach((project) => {
    projectMap.set(String(project.id), project);
  });

  apiProjects.forEach((project) => {
    projectMap.set(String(project.id), {
      ...projectMap.get(String(project.id)),
      ...project
    });
  });

  return Array.from(projectMap.values());
}

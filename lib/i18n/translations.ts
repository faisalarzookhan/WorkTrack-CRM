// Define the structure of our translations
export type Translation = {
  common: {
    welcome: string
    login: string
    logout: string
    username: string
    password: string
    email: string
    submit: string
    cancel: string
    save: string
    delete: string
    edit: string
    search: string
    loading: string
    error: string
    success: string
  }
  navigation: {
    dashboard: string
    department: string
    timesheet: string
    equipment: string
    report: string
    settings: string
    profile: string
    admin: string
  }
  dashboard: {
    title: string
    tasks: string
    pendingTasks: string
    completedTasks: string
    addTask: string
    noTasks: string
  }
  timesheet: {
    title: string
    addEntry: string
    date: string
    startTime: string
    endTime: string
    breakDuration: string
    project: string
    description: string
    status: string
    approved: string
    pending: string
    rejected: string
    hours: string
    minutes: string
  }
  equipment: {
    title: string
    inventory: string
    drivers: string
    name: string
    type: string
    status: string
    location: string
    assignedTo: string
    maintenance: string
    operational: string
    nonOperational: string
    updateLocation: string
    requestMaintenance: string
  }
  report: {
    title: string
    timesheet: string
    tasks: string
    equipment: string
    export: string
    print: string
    dateRange: string
    totalHours: string
    completedTasks: string
    equipmentUsage: string
  }
  admin: {
    title: string
    userManagement: string
    departmentManagement: string
    equipmentManagement: string
    driverManagement: string
    approvals: string
    addUser: string
    addDepartment: string
    addEquipment: string
    addDriver: string
  }
  settings: {
    title: string
    theme: string
    language: string
    notifications: string
    profile: string
    security: string
    appearance: string
    light: string
    dark: string
    system: string
  }
}

// English translations
export const en: Translation = {
  common: {
    welcome: "Welcome",
    login: "Login",
    logout: "Logout",
    username: "Username",
    password: "Password",
    email: "Email",
    submit: "Submit",
    cancel: "Cancel",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    search: "Search",
    loading: "Loading...",
    error: "Error",
    success: "Success",
  },
  navigation: {
    dashboard: "Dashboard",
    department: "Department",
    timesheet: "Timesheet",
    equipment: "Equipment",
    report: "Report",
    settings: "Settings",
    profile: "Profile",
    admin: "Admin",
  },
  dashboard: {
    title: "Dashboard",
    tasks: "Tasks",
    pendingTasks: "Pending Tasks",
    completedTasks: "Completed Tasks",
    addTask: "Add Task",
    noTasks: "No tasks found",
  },
  timesheet: {
    title: "Timesheet",
    addEntry: "Add Time Entry",
    date: "Date",
    startTime: "Start Time",
    endTime: "End Time",
    breakDuration: "Break Duration",
    project: "Project",
    description: "Description",
    status: "Status",
    approved: "Approved",
    pending: "Pending",
    rejected: "Rejected",
    hours: "Hours",
    minutes: "Minutes",
  },
  equipment: {
    title: "Equipment & Drivers",
    inventory: "Equipment Inventory",
    drivers: "Drivers",
    name: "Name",
    type: "Type",
    status: "Status",
    location: "Location",
    assignedTo: "Assigned To",
    maintenance: "Maintenance",
    operational: "Operational",
    nonOperational: "Non-operational",
    updateLocation: "Update Location",
    requestMaintenance: "Request Maintenance",
  },
  report: {
    title: "Reports",
    timesheet: "Timesheet",
    tasks: "Tasks",
    equipment: "Equipment",
    export: "Export",
    print: "Print",
    dateRange: "Date Range",
    totalHours: "Total Hours",
    completedTasks: "Completed Tasks",
    equipmentUsage: "Equipment Usage",
  },
  admin: {
    title: "Admin Dashboard",
    userManagement: "User Management",
    departmentManagement: "Department Management",
    equipmentManagement: "Equipment Management",
    driverManagement: "Driver Management",
    approvals: "Approvals",
    addUser: "Add User",
    addDepartment: "Add Department",
    addEquipment: "Add Equipment",
    addDriver: "Add Driver",
  },
  settings: {
    title: "Settings",
    theme: "Theme",
    language: "Language",
    notifications: "Notifications",
    profile: "Profile",
    security: "Security",
    appearance: "Appearance",
    light: "Light",
    dark: "Dark",
    system: "System",
  },
}

// Spanish translations
export const es: Translation = {
  common: {
    welcome: "Bienvenido",
    login: "Iniciar sesión",
    logout: "Cerrar sesión",
    username: "Nombre de usuario",
    password: "Contraseña",
    email: "Correo electrónico",
    submit: "Enviar",
    cancel: "Cancelar",
    save: "Guardar",
    delete: "Eliminar",
    edit: "Editar",
    search: "Buscar",
    loading: "Cargando...",
    error: "Error",
    success: "Éxito",
  },
  navigation: {
    dashboard: "Panel",
    department: "Departamento",
    timesheet: "Hoja de tiempo",
    equipment: "Equipamiento",
    report: "Informes",
    settings: "Configuración",
    profile: "Perfil",
    admin: "Administrador",
  },
  dashboard: {
    title: "Panel",
    tasks: "Tareas",
    pendingTasks: "Tareas pendientes",
    completedTasks: "Tareas completadas",
    addTask: "Añadir tarea",
    noTasks: "No se encontraron tareas",
  },
  timesheet: {
    title: "Hoja de tiempo",
    addEntry: "Añadir entrada de tiempo",
    date: "Fecha",
    startTime: "Hora de inicio",
    endTime: "Hora de finalización",
    breakDuration: "Duración del descanso",
    project: "Proyecto",
    description: "Descripción",
    status: "Estado",
    approved: "Aprobado",
    pending: "Pendiente",
    rejected: "Rechazado",
    hours: "Horas",
    minutes: "Minutos",
  },
  equipment: {
    title: "Equipamiento y Conductores",
    inventory: "Inventario de equipamiento",
    drivers: "Conductores",
    name: "Nombre",
    type: "Tipo",
    status: "Estado",
    location: "Ubicación",
    assignedTo: "Asignado a",
    maintenance: "Mantenimiento",
    operational: "Operativo",
    nonOperational: "No operativo",
    updateLocation: "Actualizar ubicación",
    requestMaintenance: "Solicitar mantenimiento",
  },
  report: {
    title: "Informes",
    timesheet: "Hoja de tiempo",
    tasks: "Tareas",
    equipment: "Equipamiento",
    export: "Exportar",
    print: "Imprimir",
    dateRange: "Rango de fechas",
    totalHours: "Horas totales",
    completedTasks: "Tareas completadas",
    equipmentUsage: "Uso de equipamiento",
  },
  admin: {
    title: "Panel de administrador",
    userManagement: "Gestión de usuarios",
    departmentManagement: "Gestión de departamentos",
    equipmentManagement: "Gestión de equipamiento",
    driverManagement: "Gestión de conductores",
    approvals: "Aprobaciones",
    addUser: "Añadir usuario",
    addDepartment: "Añadir departamento",
    addEquipment: "Añadir equipamiento",
    addDriver: "Añadir conductor",
  },
  settings: {
    title: "Configuración",
    theme: "Tema",
    language: "Idioma",
    notifications: "Notificaciones",
    profile: "Perfil",
    security: "Seguridad",
    appearance: "Apariencia",
    light: "Claro",
    dark: "Oscuro",
    system: "Sistema",
  },
}

// French translations
export const fr: Translation = {
  common: {
    welcome: "Bienvenue",
    login: "Connexion",
    logout: "Déconnexion",
    username: "Nom d'utilisateur",
    password: "Mot de passe",
    email: "Email",
    submit: "Soumettre",
    cancel: "Annuler",
    save: "Enregistrer",
    delete: "Supprimer",
    edit: "Modifier",
    search: "Rechercher",
    loading: "Chargement...",
    error: "Erreur",
    success: "Succès",
  },
  navigation: {
    dashboard: "Tableau de bord",
    department: "Département",
    timesheet: "Feuille de temps",
    equipment: "Équipement",
    report: "Rapports",
    settings: "Paramètres",
    profile: "Profil",
    admin: "Admin",
  },
  dashboard: {
    title: "Tableau de bord",
    tasks: "Tâches",
    pendingTasks: "Tâches en attente",
    completedTasks: "Tâches terminées",
    addTask: "Ajouter une tâche",
    noTasks: "Aucune tâche trouvée",
  },
  timesheet: {
    title: "Feuille de temps",
    addEntry: "Ajouter une entrée de temps",
    date: "Date",
    startTime: "Heure de début",
    endTime: "Heure de fin",
    breakDuration: "Durée de pause",
    project: "Projet",
    description: "Description",
    status: "Statut",
    approved: "Approuvé",
    pending: "En attente",
    rejected: "Rejeté",
    hours: "Heures",
    minutes: "Minutes",
  },
  equipment: {
    title: "Équipement et Conducteurs",
    inventory: "Inventaire d'équipement",
    drivers: "Conducteurs",
    name: "Nom",
    type: "Type",
    status: "Statut",
    location: "Emplacement",
    assignedTo: "Assigné à",
    maintenance: "Maintenance",
    operational: "Opérationnel",
    nonOperational: "Non opérationnel",
    updateLocation: "Mettre à jour l'emplacement",
    requestMaintenance: "Demander une maintenance",
  },
  report: {
    title: "Rapports",
    timesheet: "Feuille de temps",
    tasks: "Tâches",
    equipment: "Équipement",
    export: "Exporter",
    print: "Imprimer",
    dateRange: "Plage de dates",
    totalHours: "Heures totales",
    completedTasks: "Tâches terminées",
    equipmentUsage: "Utilisation de l'équipement",
  },
  admin: {
    title: "Tableau de bord administrateur",
    userManagement: "Gestion des utilisateurs",
    departmentManagement: "Gestion des départements",
    equipmentManagement: "Gestion des équipements",
    driverManagement: "Gestion des conducteurs",
    approvals: "Approbations",
    addUser: "Ajouter un utilisateur",
    addDepartment: "Ajouter un département",
    addEquipment: "Ajouter un équipement",
    addDriver: "Ajouter un conducteur",
  },
  settings: {
    title: "Paramètres",
    theme: "Thème",
    language: "Langue",
    notifications: "Notifications",
    profile: "Profil",
    security: "Sécurité",
    appearance: "Apparence",
    light: "Clair",
    dark: "Sombre",
    system: "Système",
  },
}


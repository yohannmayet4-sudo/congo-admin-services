export interface User {
  id: string;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  gender?: string;
  birth_date?: string;
  nationality?: string;
  address?: string;
  phone?: string;
  profile_picture?: string;
  role: 'admin' | 'agent' | 'user' | 'delivery' | 'super_admin';
  email_verified: boolean;
  two_factor_enabled: boolean;
  last_login?: string;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  type: 'passport' | 'residence_card' | 'arrival_declaration';
  required_documents: string[];
  created_at: string;
  updated_at: string;
}

export interface Dossier {
  id: string;
  user_id: string;
  service_id: string;
  status: 'draft' | 'submitted' | 'analyzing' | 'pending_complement' | 'validated' | 'rejected' | 'production' | 'available' | 'delivery' | 'delivered';
  data: Record<string, any>;
  documents: string[];
  folder_number: string;
  submitted_at?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  read: boolean;
  dossier_id?: string;
  created_at: string;
}

export interface Delivery {
  id: string;
  dossier_id: string;
  user_id: string;
  status: 'pending' | 'in_transit' | 'delivered';
  address: string;
  phone: string;
  preferred_date: string;
  comments?: string;
  delivery_agent_id?: string;
  signature?: string;
  delivered_at?: string;
  created_at: string;
  updated_at: string;
}

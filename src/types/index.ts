// Shared Type Definitions between React & Laravel API
// This file documents the data contracts

export type EventCategory = 'Festival' | 'Workshop' | 'Competition' | 'Performance' | 'Training';
export type EventStatus = 'draft' | 'published' | 'archived';
export type UserRole = 'admin' | 'editor' | 'viewer';
export type DanceDifficulty = 'beginner' | 'intermediate' | 'advanced';

// ============ EVENT ============
export interface Event {
    id: number;
    slug: string;
    title: string;
    category: EventCategory;
    date_start: string; // ISO 8601
    date_end?: string;
    location: string;
    description: string;
    short_description: string;
    image_url: string;
    image_alt?: string;
    featured: boolean;
    status: EventStatus;
    created_at: string;
    updated_at: string;
}

export interface EventAgendaItem {
    id: number;
    event_id: number;
    time: string;
    title: string;
    description?: string;
}

// ============ DANCE ============
export interface Dance {
    id: number;
    slug: string;
    name: string;
    category_id: number;
    origin: string;
    description: string;
    history: string;
    philosophy: string;
    costume_description: string;
    difficulty: DanceDifficulty;
    duration_minutes: number;
    number_of_dancers: number;
    thumbnail_url: string;
    gallery_images: Array<{ url: string; alt: string }>;
    videos: Array<{ url: string; title: string }>;
    musical_instruments: string[];
    properties: string[];
    related_events: Array<{ id: number; slug: string; title: string; date: string }>;
    status: EventStatus;
    created_at: string;
    updated_at: string;
}

export interface DanceCategory {
    id: number;
    name: string;
    slug: string;
    description?: string;
}

// ============ NEWS ============
export interface News {
    id: number;
    slug: string;
    title: string;
    content: string;
    excerpt: string;
    featured_image_url: string;
    author: { id: number; name: string };
    published_at: string;
    status: EventStatus;
    created_at: string;
    updated_at: string;
}

// ============ MEDIA ============
export interface Media {
    id: number;
    file_name: string;
    file_path: string;
    file_size: number;
    mime_type: string;
    alt_text?: string;
    uploaded_by: number;
    created_at: string;
    updated_at: string;
}

// ============ USER ============
export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    active: boolean;
    created_at: string;
}

// ============ AUTH ============
export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    access_token: string;
    token_type: 'Bearer';
    expires_in: number;
    user: User;
}

// ============ API RESPONSE ============
export interface ApiResponse<T> {
    data: T | T[];
    meta?: {
        total: number;
        page: number;
        per_page: number;
        last_page: number;
    };
    error?: {
        code: string;
        message: string;
    };
}

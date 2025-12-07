export type Role = 'arc0' | 'arc1' | 'user';

export interface Message {
    role: Role;
    content: string;
    trace_id: string;
    timestamp: number;
    context?: Record<string, unknown>;
}

export interface Spark {
    summary: string;
    evidence: string[];
    timestamp: number;
    confidence: number;
    tags: string[];
    export_formats: {
        markdown: string;
        json: object;
        plaintext: string;
    };
}

export interface Dialogue {
    messages: Message[];
    spark?: Spark;
}

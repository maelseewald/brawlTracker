// Central export for all icons used in BrawlTracker

type IconProps = {
    className?: string;
    size?: number;
};

export function TrophyIcon({ className = '', size = 20 }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
            <path d="M7 3H17V13C17 15.761 14.761 18 12 18C9.239 18 7 15.761 7 13V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M7 6H4C4 8.209 5.791 10 8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M17 6H20C20 8.209 18.209 10 16 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 18V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M8 21H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

export function StarIcon({ className = '', size = 20 }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
    );
}

export function SoloIcon({ className = '', size = 20 }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
            <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M5 20C5 17 8.134 14.5 12 14.5C15.866 14.5 19 17 19 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 11.5V14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

export function DuoIcon({ className = '', size = 20 }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
            <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="16" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
            <path d="M3 20C3 17.5 5.686 15.5 9 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M21 20C21 17.5 18.314 15.5 15 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M9 15.5C10.25 15 12.75 15 15 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

export function TrioIcon({ className = '', size = 20 }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
            <path d="M12 3L14.5 8H19.5L15.5 11L17 16L12 13L7 16L8.5 11L4.5 8H9.5L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M7 20H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M9 18L7 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M15 18L17 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

export function ExpIcon({ className = '', size = 20 }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
            <polyline points="22,7 13.5,15.5 8.5,10.5 2,17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="16,7 22,7 22,13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function PointsIcon({ className = '', size = 20 }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
            <polygon points="12,2 15.09,8.26 22,9.27 17.5,13.64 18.64,20.56 12,17.07 5.36,20.56 6.5,13.64 2,9.27 8.91,8.26" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
}

export function PrestigeIcon({ className = '', size = 20 }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
            <path d="M5 3H19L17 9H7L5 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M7 9L12 21L17 9" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
    );
}

export function RobotIcon({ className = '', size = 20 }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
            <rect x="5" y="9" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 9V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="12" cy="5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="9" cy="13.5" r="1" fill="currentColor" />
            <circle cx="15" cy="13.5" r="1" fill="currentColor" />
            <path d="M9 17H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M1 13H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M19 13H23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

export function SearchIcon({ className = '', size = 20 }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path d="M16.5 16.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

export function LineChartIcon({ className = '', size = 20 }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
            <polyline points="3,17 8,12 13,14 21,6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 20H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

export function BarChartIcon({ className = '', size = 20 }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
            <rect x="3" y="12" width="4" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <rect x="10" y="7" width="4" height="13" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <rect x="17" y="4" width="4" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
            <path d="M3 22H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

export function ArrowLeftIcon({ className = '', size = 16 }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
            <path d="M19 12H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function CloseIcon({ className = '', size = 16 }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

export function BigBrawlerIcon({ className = '', size = 20 }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
            <path d="M12 3C8 3 5 6 5 10C5 12 6 14 8 15.5L9 21H15L16 15.5C18 14 19 12 19 10C19 6 16 3 12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M9 10.5C9.5 9.5 10.5 9 12 9C13.5 9 14.5 9.5 15 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

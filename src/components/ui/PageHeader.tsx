import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  backgroundImage?: string; // kept for backwards compat, unused
}

export function PageHeader({ title, subtitle, breadcrumbs }: PageHeaderProps) {
  const location = useLocation();

  const crumbs: BreadcrumbItem[] = breadcrumbs ?? (() => {
    const segments = location.pathname.split('/').filter(Boolean);
    return segments.map((seg, i) => {
      const label = seg.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      const href = '/' + segments.slice(0, i + 1).join('/');
      const isLast = i === segments.length - 1;
      return isLast ? { label: title } : { label, href };
    });
  })();

  return (
    <div className="w-full border-b border-slate-200 bg-slate-50 pt-24 pb-6 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
        {subtitle && <p className="text-slate-500 mb-3">{subtitle}</p>}

        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-slate-500 flex-wrap">
          <Link to="/" className="flex items-center gap-1 hover:text-slate-900 transition-colors">
            <Home size={13} />
            <span>Home</span>
          </Link>
          {crumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <ChevronRight size={13} className="text-slate-400" />
              {crumb.href ? (
                <Link to={crumb.href} className="hover:text-slate-900 transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-slate-900 font-medium">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </div>
  );
}

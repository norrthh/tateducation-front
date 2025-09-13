'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
    const pathname = usePathname() || "/";

    const isActive = (href: string, exact = false) =>
        exact ? pathname === href : (pathname === href || pathname.startsWith(href + "/"));

    return (
        <footer className="nav-bar">
            <Link
                href="/"
                className={`nav-item ${isActive("/", true) ? "active" : ""}`}
                aria-current={isActive("/", true) ? "page" : undefined}
            >
                <img src="/images/nav-img1.svg" alt="" className="nav-item-img" />
            </Link>

            <a href="#" className="nav-item">
                <img src="/images/nav-img3.svg" alt="" className="nav-item-img" />
            </a>

            <Link
                href="/task"
                className={`nav-item ${isActive("/task") ? "active" : ""}`}
                aria-current={isActive("/task") ? "page" : undefined}
            >
                <img src="/images/nav-img2.svg" alt="" className="nav-item-img" />
            </Link>

            <a href="#" className="nav-item">
                <img src="/images/nav-img4.svg" alt="" className="nav-item-img" />
            </a>
            <a href="#" className="nav-item">
                <img src="/images/nav-img5.svg" alt="" className="nav-item-img" />
            </a>
            <a href="#" className="nav-item">
                <img src="/images/nav-img6.svg" alt="" className="nav-item-img" />
            </a>
        </footer>
    );
};

export default Footer;

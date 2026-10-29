import Link from "next/link";
import { contact, footerServices, mainNav, social } from "@/content/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-line bg-footer">
      <div className="container-site pt-[64px]">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[419fr_277fr_277fr_307fr] lg:gap-0">
          <div>
            <Logo />
            <p className="mt-[17px] max-w-[300px] text-[15px] leading-[23px] text-muted">
              A software house building AI agents, n8n automation and web apps.
            </p>
          </div>
          <FooterColumn title="Pages">
            {mainNav.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>
          <FooterColumn title="Services">
            {footerServices.map((item) => (
              <FooterLink key={item.label} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>
          <FooterColumn title="Contact">
            <li>
              <a href={`mailto:${contact.email}`} className="text-muted hover:text-text">
                {contact.email}
              </a>
            </li>
            <li className="text-muted">{contact.location}</li>
            <li className="text-muted">
              <a
                href={social.linkedin}
                rel="me noopener"
                target="_blank"
                className="hover:text-text"
              >
                LinkedIn
              </a>{" "}
              ·{" "}
              <a href={social.github} rel="me noopener" target="_blank" className="hover:text-text">
                GitHub
              </a>{" "}
              ·{" "}
              <a href={social.upwork} rel="me noopener" target="_blank" className="hover:text-text">
                Upwork
              </a>
            </li>
          </FooterColumn>
        </div>
        <div className="mt-[57px] flex flex-col gap-3 border-t border-line pt-[22px] pb-[33px] text-[14px] leading-[22px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Agentix. All rights reserved.</p>
          <p>
            <Link href="/privacy" className="hover:text-text">
              Privacy
            </Link>{" "}
            ·{" "}
            <Link href="/terms" className="hover:text-text">
              Terms
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-body text-[15px] leading-[22px] font-semibold text-text">{title}</h2>
      <ul className="m-0 mt-[12px] grid list-none gap-[8px] p-0 text-[15px] leading-[22px]">
        {children}
      </ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-muted transition-colors hover:text-text">
        {children}
      </Link>
    </li>
  );
}

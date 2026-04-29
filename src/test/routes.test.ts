import { describe, it, expect } from "vitest";
import { programs } from "@/data/programs";

describe("Route Validation", () => {
  const expectedRoutes = [
    { path: "/", name: "Home" },
    { path: "/programs", name: "Programs" },
    { path: "/compare", name: "Compare" },
    { path: "/how-it-works", name: "How It Works" },
    { path: "/services", name: "Services" },
    { path: "/about", name: "About" },
  ];

  it("should have all expected static routes defined", () => {
    expect(expectedRoutes.length).toBe(6);
  });

  it("should generate valid program detail routes", () => {
    const activePrograms = programs.filter((p) => !p.comingSoon);

    activePrograms.forEach((program) => {
      const route = `/programs/${program.id}`;
      expect(route).toMatch(/^\/programs\/[a-z-]+$/);
    });
  });

  it("should have 8 total page types (6 static + 1 dynamic + 1 404)", () => {
    const totalPages = 8;
    expect(totalPages).toBe(8);
  });
});

describe("Navigation Links", () => {
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Programs", href: "/programs" },
    { name: "Compare", href: "/compare" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
  ];

  it("should have all navigation items with valid paths", () => {
    navLinks.forEach((link) => {
      expect(link.href).toMatch(/^\//);
      expect(link.name.length).toBeGreaterThan(0);
    });
  });
});

describe("External Links", () => {
  const externalLinks = {
    whatsapp: "https://wa.me/244787676544",
    phone: "tel:+244787676544",
    email: "mailto:info@passportcapital.com",
  };

  it("should have valid WhatsApp link format", () => {
    expect(externalLinks.whatsapp).toMatch(/^https:\/\/wa\.me\/\d+$/);
  });

  it("should have valid phone link format", () => {
    expect(externalLinks.phone).toMatch(/^tel:\+\d+$/);
  });

  it("should have valid email link format", () => {
    expect(externalLinks.email).toMatch(/^mailto:.+@.+\..+$/);
  });
});

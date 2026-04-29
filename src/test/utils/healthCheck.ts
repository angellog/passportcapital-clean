import { programs } from "@/data/programs";

export interface HealthCheckResult {
  category: string;
  name: string;
  status: "pass" | "fail" | "warning";
  details?: string;
}

export interface HealthReport {
  timestamp: string;
  overallScore: number;
  categories: {
    name: string;
    score: number;
    total: number;
    passed: number;
    items: HealthCheckResult[];
  }[];
  issues: HealthCheckResult[];
}

export function validateProgramData(): HealthCheckResult[] {
  const results: HealthCheckResult[] = [];
  const requiredFields = [
    "id",
    "country",
    "region",
    "flag",
    "minInvestment",
    "investmentType",
    "processingTime",
    "visaFreeCountries",
    "highlights",
    "description",
    "programType",
    "image",
  ];

  programs.forEach((program) => {
    const missingFields = requiredFields.filter(
      (field) => !program[field as keyof typeof program]
    );

    if (missingFields.length > 0) {
      results.push({
        category: "Data Integrity",
        name: `${program.country} - Missing Fields`,
        status: "fail",
        details: `Missing: ${missingFields.join(", ")}`,
      });
    } else {
      results.push({
        category: "Data Integrity",
        name: `${program.country} - Core Data`,
        status: "pass",
      });
    }

    if (program.minInvestment <= 0) {
      results.push({
        category: "Data Integrity",
        name: `${program.country} - Investment Amount`,
        status: "fail",
        details: "Investment amount must be positive",
      });
    }

    if (
      program.image &&
      !program.image.startsWith("http") &&
      !program.image.startsWith("/")
    ) {
      results.push({
        category: "Images",
        name: `${program.country} - Image URL`,
        status: "warning",
        details: "Image URL format may be invalid",
      });
    } else {
      results.push({
        category: "Images",
        name: `${program.country} - Image URL`,
        status: "pass",
      });
    }

    const validRegions = [
      "caribbean",
      "europe",
      "middle-east",
      "pacific",
      "americas",
      "africa",
      "asia",
    ];
    if (!validRegions.includes(program.region)) {
      results.push({
        category: "Data Integrity",
        name: `${program.country} - Region`,
        status: "fail",
        details: `Invalid region: ${program.region}`,
      });
    }

    if (!["citizenship", "residency"].includes(program.programType)) {
      results.push({
        category: "Data Integrity",
        name: `${program.country} - Program Type`,
        status: "fail",
        details: `Invalid program type: ${program.programType}`,
      });
    }

    if (program.costBreakdown) {
      const cb = program.costBreakdown;
      const hasInvestmentRoute =
        cb.investmentRoutes && cb.investmentRoutes.length > 0;
      const hasLegacyInvestment = cb.donationAmount || cb.realEstateMin;

      if (!hasInvestmentRoute && !hasLegacyInvestment) {
        results.push({
          category: "Cost Breakdown",
          name: `${program.country} - Investment Options`,
          status: "warning",
          details: "No investment routes or legacy amounts defined",
        });
      } else {
        results.push({
          category: "Cost Breakdown",
          name: `${program.country} - Investment Options`,
          status: "pass",
        });
      }
    }
  });

  return results;
}

export function generateHealthReport(): HealthReport {
  const allResults = validateProgramData();

  const categories = new Map<string, HealthCheckResult[]>();
  allResults.forEach((result) => {
    const existing = categories.get(result.category) || [];
    existing.push(result);
    categories.set(result.category, existing);
  });

  const categoryReports = Array.from(categories.entries()).map(
    ([name, items]) => {
      const passed = items.filter((i) => i.status === "pass").length;
      return {
        name,
        score: Math.round((passed / items.length) * 100),
        total: items.length,
        passed,
        items,
      };
    }
  );

  const totalPassed = categoryReports.reduce((sum, c) => sum + c.passed, 0);
  const totalItems = categoryReports.reduce((sum, c) => sum + c.total, 0);

  return {
    timestamp: new Date().toISOString(),
    overallScore: Math.round((totalPassed / totalItems) * 100),
    categories: categoryReports,
    issues: allResults.filter((r) => r.status !== "pass"),
  };
}

export function getProgramCounts() {
  const regions = [
    "caribbean",
    "europe",
    "middle-east",
    "pacific",
    "americas",
    "africa",
    "asia",
  ];

  return regions.map((region) => ({
    region,
    count: programs.filter((p) => p.region === region).length,
    active: programs.filter((p) => p.region === region && !p.comingSoon).length,
    comingSoon: programs.filter((p) => p.region === region && p.comingSoon)
      .length,
  }));
}

export function getLinkInventory() {
  return {
    internal: {
      navigation: 6,
      footerQuickLinks: 5,
      footerRegions: 4,
      programCards: programs.filter((p) => !p.comingSoon).length,
      programDetails: programs.filter((p) => !p.comingSoon).length,
    },
    external: {
      whatsapp: "wa.me/244787676544",
      phone: "tel:+244787676544",
      email: "mailto:info@passportcapital.com",
    },
    placeholders: 3,
  };
}

export function getImageInventory() {
  return {
    programHeaders: programs.length,
    localAssets: 1,
    sources: {
      unsplash: programs.filter((p) => p.image.includes("unsplash")).length,
      local: programs.filter((p) => !p.image.includes("http")).length,
    },
  };
}

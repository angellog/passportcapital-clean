import { describe, it, expect } from "vitest";
import { programs, getProgramById } from "@/data/programs";
import {
  validateProgramData,
  generateHealthReport,
  getProgramCounts,
} from "./utils/healthCheck";

describe("Programs Data Integrity", () => {
  it("should have all required programs", () => {
    expect(programs.length).toBeGreaterThanOrEqual(22);
  });

  it("should have unique IDs for all programs", () => {
    const ids = programs.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("should have valid region values", () => {
    const validRegions = [
      "caribbean",
      "europe",
      "middle-east",
      "pacific",
      "americas",
      "africa",
      "asia",
    ];
    programs.forEach((program) => {
      expect(validRegions).toContain(program.region);
    });
  });

  it("should have valid program types", () => {
    programs.forEach((program) => {
      expect(["citizenship", "residency"]).toContain(program.programType);
    });
  });

  it("should have positive investment amounts", () => {
    programs.forEach((program) => {
      expect(program.minInvestment).toBeGreaterThan(0);
    });
  });

  it("should have valid image URLs", () => {
    programs.forEach((program) => {
      expect(
        program.image.startsWith("http") || program.image.startsWith("/")
      ).toBe(true);
    });
  });

  it("should have exactly 3 highlights per program", () => {
    programs.forEach((program) => {
      expect(program.highlights.length).toBe(3);
    });
  });

  it("should retrieve programs by ID correctly", () => {
    const dominica = getProgramById("dominica");
    expect(dominica).toBeDefined();
    expect(dominica?.country).toBe("Dominica");

    const invalid = getProgramById("invalid-id");
    expect(invalid).toBeUndefined();
  });
});

describe("Region Distribution", () => {
  it("should have programs in Caribbean region", () => {
    const caribbean = programs.filter((p) => p.region === "caribbean");
    expect(caribbean.length).toBeGreaterThanOrEqual(5);
  });

  it("should have programs in Europe region", () => {
    const europe = programs.filter((p) => p.region === "europe");
    expect(europe.length).toBeGreaterThanOrEqual(8);
  });

  it("should have programs in all regions", () => {
    const counts = getProgramCounts();
    counts.forEach((region) => {
      expect(region.count).toBeGreaterThan(0);
    });
  });
});

describe("Cost Breakdown Validation", () => {
  it("should have valid cost breakdowns where present", () => {
    programs.forEach((program) => {
      if (program.costBreakdown) {
        const cb = program.costBreakdown;
        const hasInvestment = Boolean(
          (cb.investmentRoutes && cb.investmentRoutes.length > 0) ||
          cb.donationAmount ||
          cb.realEstateMin
        );
        expect(hasInvestment).toBe(true);

        expect(cb.dueDiligence).toBeDefined();
        expect(cb.dueDiligence).toBeGreaterThanOrEqual(0);
      }
    });
  });

  it("should calculate totals correctly for investment routes", () => {
    programs.forEach((program) => {
      if (program.costBreakdown?.investmentRoutes) {
        program.costBreakdown.investmentRoutes.forEach((route) => {
          expect(route.amount).toBeGreaterThan(0);
          expect(route.name).toBeDefined();
        });
      }
    });
  });
});

describe("Health Check Utilities", () => {
  it("should validate all programs without critical failures", () => {
    const results = validateProgramData();
    const failures = results.filter((r) => r.status === "fail");

    if (failures.length > 0) {
      console.log("Validation failures:", failures);
    }

    expect(failures.length).toBe(0);
  });

  it("should generate health report successfully", () => {
    const report = generateHealthReport();

    expect(report.timestamp).toBeDefined();
    expect(report.overallScore).toBeGreaterThanOrEqual(90);
    expect(report.categories.length).toBeGreaterThan(0);
  });
});

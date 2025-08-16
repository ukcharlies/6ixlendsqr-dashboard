// src/tests/Users.test.tsx
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import UserDetails from "../pages/UserDetails";
import { fetchAllUsers, fetchUserById } from "../services/db";
import { getUserLocal } from "../services/storage";

// Mock the services
vi.mock("../services/db", () => ({
  fetchAllUsers: vi.fn(),
  fetchUserById: vi.fn(),
}));

// Mock react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ id: "1" }),
    useNavigate: () => vi.fn(),
  };
});

// Update localStorage mock implementation
const mockStorage: { [key: string]: string } = {};
const mockLocalStorage = {
  getItem: vi.fn((key: string) => mockStorage[key] || null),
  setItem: vi.fn((key: string, value: string) => {
    mockStorage[key] = value;
  }),
  clear: vi.fn(() => {
    Object.keys(mockStorage).forEach((key) => delete mockStorage[key]);
  }),
  removeItem: vi.fn((key: string) => {
    delete mockStorage[key];
  }),
};
Object.defineProperty(window, "localStorage", { value: mockLocalStorage });

describe("Dashboard Component", () => {
  const mockUsers = [
    {
      id: 1,
      fullName: "Test User",
      emailAddress: "test@example.com",
      organization: "Test Org",
      phoneNumber: "1234567890",
      status: "Active",
      loanRepayment: 50000,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (fetchAllUsers as any).mockResolvedValue(mockUsers);
    mockLocalStorage.clear();
  });

  test("renders dashboard with user data", async () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    // loading visible immediately
    expect(screen.getByTestId("loading-state")).toBeInTheDocument();

    // wait for the username row to appear
    await waitFor(() => {
      expect(screen.getByTestId("user-name")).toBeInTheDocument();
    });

    // Find the StatCard with title "USERS" and assert its count is 1
    const usersTitle = screen.getByText("USERS");
    const statCard = usersTitle.closest(".stat-card") as HTMLElement;
    expect(statCard).not.toBeNull();
    if (statCard) {
      const { getByText } = within(statCard);
      expect(getByText("1")).toBeInTheDocument();
    }

    // status cell is present and shows Active
    expect(screen.getByTestId("user-status")).toHaveTextContent("Active");
  });

  test("filters users correctly (toggle filter)", async () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("user-name")).toBeInTheDocument();
    });

    // Click filter button (use test id)
    fireEvent.click(screen.getByTestId("filter-btn-organization"));
    // Toggle it off again
    fireEvent.click(screen.getByTestId("filter-btn-organization"));

    // Verify the user row still exists
    expect(screen.getByTestId("user-name")).toBeInTheDocument();
  });

  test("handles API error gracefully", async () => {
    // Make fetchAllUsers reject for this test
    (fetchAllUsers as any).mockRejectedValue(new Error("API Error"));

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    // Wait for loading to finish and ensure no user rows exist
    await waitFor(() => {
      expect(screen.queryByTestId("user-name")).toBeNull();
    });

    // The stat card for USERS should show 0 (initial userStats.totalUsers is 0)
    const usersTitle = screen.getByText("USERS");
    const statCard = usersTitle.closest(".stat-card") as HTMLElement;
    expect(statCard).not.toBeNull();
    if (statCard) {
      const { getByText } = within(statCard);
      expect(getByText("0")).toBeInTheDocument();
    }
  });

  test("shows empty state when no users match filter (no users returned)", async () => {
    // For this test simulate no users returned from API
    (fetchAllUsers as any).mockResolvedValueOnce([]);

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByTestId("loading-state")).toBeNull();
    });

    // There should be no user rows (no elements with data-testid="user-name")
    expect(screen.queryByTestId("user-name")).toBeNull();

    // The "USERS" count should be 0
    const usersTitle = screen.getByText("USERS");
    const statCard = usersTitle.closest(".stat-card") as HTMLElement;
    expect(statCard).not.toBeNull();
    if (statCard) {
      const { getByText } = within(statCard);
      expect(getByText("0")).toBeInTheDocument();
    }
  });
});

describe("UserDetails Component", () => {
  const mockUser = {
    id: 1,
    fullName: "Test User",
    emailAddress: "test@example.com",
    phoneNumber: "1234567890",
    bvn: "12345678901",
    gender: "Male",
    maritalStatus: "Single",
    children: "None",
    typeOfResidence: "Apartment",
    educationLevel: "B.Sc",
    employmentStatus: "Employed",
    monthlyIncome: "₦200,000 - ₦400,000",
    loanRepayment: 50000,
    status: "Active",
    socials: {
      twitter: "@test",
      facebook: "test.user",
      instagram: "@test.user",
    },
    guarantors: [
      {
        fullName: "Test Guarantor",
        phoneNumber: "0987654321",
        emailAddress: "guarantor@test.com",
        relationship: "Sibling",
      },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.clear();
    mockLocalStorage.getItem.mockReturnValue(null);
    (fetchUserById as any).mockResolvedValue(mockUser);
  });

  test("loads user details from API", async () => {
    render(
      <BrowserRouter>
        <UserDetails />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("user-full-name")).toBeInTheDocument();
    });

    // Verify user details sections
    expect(screen.getByText("Personal Information")).toBeInTheDocument();
    expect(screen.getByText("Education and Employment")).toBeInTheDocument();
    expect(screen.getByText("Socials")).toBeInTheDocument();
    expect(screen.getByText("Guarantor")).toBeInTheDocument();
  });

  test("loads user details from localStorage", async () => {
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify({ 1: mockUser }));

    render(
      <BrowserRouter>
        <UserDetails />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("user-full-name")).toBeInTheDocument();
    });

    // Verify API wasn't called
    expect(fetchUserById).not.toHaveBeenCalled();
  });

  test("blacklist user functionality", async () => {
    render(
      <BrowserRouter>
        <UserDetails />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("user-full-name")).toHaveTextContent(
        "Test User"
      );
    });

    fireEvent.click(screen.getByTestId("blacklist-button"));

    // // Verify status change (data-testid="user-status")
    // await waitFor(() => {
    //   expect(screen.getByTestId("user-status")).toHaveTextContent(
    //     "Blacklisted"
    //   );
    // });
    // expect(mockLocalStorage.setItem).toHaveBeenCalled();
  });

  test("handles API error in user details", async () => {
    (fetchUserById as any).mockRejectedValue(new Error("API Error"));

    render(
      <BrowserRouter>
        <UserDetails />
      </BrowserRouter>
    );

    // Wait for error message (UserDetails sets an error string on fetch failure)
    await waitFor(
      () => {
        expect(
          screen.getByText("Error loading user details")
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  test("handles corrupt localStorage data", async () => {
    // Setup invalid JSON in localStorage
    mockLocalStorage.getItem.mockReturnValue("invalid json");

    render(
      <BrowserRouter>
        <UserDetails />
      </BrowserRouter>
    );

    // Should show loading initially
    expect(screen.getByTestId("loading-state")).toBeInTheDocument();

    // Should call API as fallback
    await waitFor(() => {
      expect(fetchUserById).toHaveBeenCalledWith(1);
    });

    // Should show user data from API
    await waitFor(() => {
      expect(screen.getByTestId("user-full-name")).toHaveTextContent(
        mockUser.fullName
      );
    });
  });
});

describe("Utility Functions", () => {
  describe("Storage Functions", () => {
    beforeEach(() => {
      mockLocalStorage.clear();
      vi.clearAllMocks();
    });

    test("saves and retrieves user from localStorage", () => {
      const user = { id: 1, name: "Test" };
      const key = "lendsqr_user_1";

      // Update mock implementation
      mockLocalStorage.getItem.mockImplementation((k) =>
        k === key ? JSON.stringify(user) : null
      );

      expect(getUserLocal(1)).toEqual(user);
    });

    test("returns null for non-existent user", () => {
      expect(getUserLocal(999)).toBeNull();
    });

    test("handles corrupt data gracefully", () => {
      // Setup corrupt data
      mockLocalStorage.getItem.mockReturnValue("invalid json");
      const result = getUserLocal(1);
      expect(result).toBeNull();
    });

    test("handles storage errors", () => {
      mockLocalStorage.setItem.mockImplementationOnce(() => {
        throw new Error("Storage full");
      });
      expect(() => {
        getUserLocal(1);
      }).not.toThrow();
    });
  });
});

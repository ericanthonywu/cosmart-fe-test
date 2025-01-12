import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Books } from "@/model/books";
import BookList from "@/app/books/page";
import { useGetBooksQuery } from "@/repository/books/getBooks";
import { useAddScheduleMutation } from "@/repository/schedule/addSchedule";
import { toast } from "react-toastify";
import { jest } from "@jest/globals";

// Mock hooks and libraries
jest.mock("@/repository/books/getBooks", () => ({
    useGetBooksQuery: jest.fn(),
}));

jest.mock("@/repository/schedule/addSchedule", () => ({
    useAddScheduleMutation: jest.fn(),
}));

jest.mock("react-toastify", () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

const mockBooks: Books[] = [
    { key: "1", title: "Book 1", authors: "Author 1", editionCount: "1" },
    { key: "2", title: "Book 2", authors: "Author 2", editionCount: "2" },
];

describe("BookList Component", () => {
    beforeEach(() => {
        (useGetBooksQuery as jest.Mock).mockReturnValue({
            data: mockBooks,
        });
        (useAddScheduleMutation as jest.Mock).mockReturnValue({
            mutate: jest.fn(),
        });
    });

    it("renders book list", () => {
        render(<BookList />);
        mockBooks.forEach((book) => {
            expect(screen.getByText(book.title)).toBeInTheDocument();
            expect(screen.getByText(`Author(s): ${book.authors}`)).toBeInTheDocument();
        });
    });

    it("updates genre input", () => {
        render(<BookList />);
        const genreInput = screen.getByPlaceholderText("Enter genre");
        fireEvent.change(genreInput, { target: { value: "fiction" } });
        expect(genreInput).toHaveValue("fiction");
    });

    it("opens schedule popup on book button click", () => {
        render(<BookList />);
        const bookButton = screen.getByText("Book a Schedule!").firstChild;
        fireEvent.click(bookButton);
        expect(screen.getByText("Schedule a Pickup")).toBeInTheDocument();
    });

    it("closes schedule popup when cancel button is clicked", () => {
        render(<BookList />);
        const bookButton = screen.getByText("Book a Schedule!").firstChild;
        fireEvent.click(bookButton);
        const cancelButton = screen.getByText("Cancel");
        fireEvent.click(cancelButton);
        expect(screen.queryByText("Schedule a Pickup")).not.toBeInTheDocument();
    });

    it("handles schedule submission with missing pickup time", async () => {
        render(<BookList />);
        const bookButton = screen.getByText("Book a Schedule!").firstChild;
        fireEvent.click(bookButton);

        const addButton = screen.getByText("Add Schedule");
        fireEvent.click(addButton);

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith("Please select a pickup time!");
        });
    });

    it("handles successful schedule submission", async () => {
        render(<BookList />);
        const bookButton = screen.getByText("Book a Schedule!").firstChild;
        fireEvent.click(bookButton);

        const pickupTimeInput = screen.getByLabelText("Pickup Time");
        fireEvent.change(pickupTimeInput, { target: { value: "2025-01-01T10:00" } });

        const addButton = screen.getByText("Add Schedule");
        fireEvent.click(addButton);

        await waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith("Schedule successfully added!");
        });
    });

    it("handles pagination", () => {
        render(<BookList />);

        const previousButton = screen.getByText("Previous");
        const nextButton = screen.getByText("Next");

        fireEvent.click(nextButton);
        expect(screen.getByText("Page 2")).toBeInTheDocument();

        fireEvent.click(previousButton);
        expect(screen.getByText("Page 1")).toBeInTheDocument();
    });
});

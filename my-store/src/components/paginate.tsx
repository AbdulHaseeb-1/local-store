import React from "react";
import { Button } from "@/components/ui/button"; // Assuming Button component is in the same directory or imported from another location
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    perPage: number;
    onPageChange: (pageNumber: number) => void;
    onPerPageChange?: (itemsPerPage: number) => void; // Optional callback for perPage changes
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    perPage,
    onPageChange,
    onPerPageChange,
}) => { 
    // ... component logic for handling pagination state and rendering controls ...

    // Example rendering with conditional buttons based on current page
    return (
        <div className="flex justify-center items-center gap-4">
            <Button
                   variant={"ghost"}
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                {"<"}  Previous
            </Button>
            <span className="text-xs">
                Page {currentPage} of {totalPages}
            </span>
            <Button
                variant={"ghost"}
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next {">"}
            </Button>
            {onPerPageChange && ( // Render perPage dropdown if callback is provided
                <div className=" flex ">
                    <Select onValueChange={(e) => onPerPageChange(parseInt(e))}>
                        <SelectTrigger>{perPage}</SelectTrigger>
                        <SelectContent>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                    </Select>
                    {/* <div className=""> per page</div> */}
                </div>
            )
            }
        </div >
    );
};

export default Pagination;

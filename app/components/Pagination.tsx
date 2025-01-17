'use client'

import React from 'react';
import './Pagination.css';
import { useEventStore } from '../store';

interface PaginationProps {
    totalSize: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalSize }) => {
    const { currentPage, setCurrentPage } = useEventStore();
    const itemsPerPage = 15;
    const totalPages = Math.ceil(totalSize / itemsPerPage);

    return (
        <div className="pagination">
            <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &lt;
            </button>
            <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                &gt;
            </button>
        </div>
    );
};

export default Pagination;
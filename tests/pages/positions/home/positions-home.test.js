/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from '@/app/positions/home/page';
import positionProxy from '@/proxies/position-proxy';
import { testPositionsShort } from '@/data/seed/test-positions';

jest.mock('@/proxies/position-proxy');

const mockPositionsGetAllNoParameters = testPositionsShort;
const mockPositionsScenarioGetAllTypeLong = testPositionsShort.filter(position => position.type === 'long');
const mockPositionsScenarioGetAllTypeShort = testPositionsShort.filter(position => position.type === 'short');
const mockPositionsScenarioGetAllSortSizeAscending = [...testPositionsShort].sort((a, b) => a.size - b.size);

describe('Positions Home Page', () => {
    beforeEach(() => {
        positionProxy.getAll.mockImplementation(({ page, limit, sortBy, order, filters }) => {
            if (page === 1 && limit === 20 && sortBy === 'id' && order === 'asc' && Object.keys(filters).length === 0) {
                return Promise.resolve({ data: mockPositionsGetAllNoParameters, totalPositions: mockPositionsGetAllNoParameters.length, totalPages: 1 });
            }
            if (page === 1 && limit === 20 && sortBy === 'id' && order === 'asc' && filters?.type === 'long') {
                return Promise.resolve({ data: mockPositionsScenarioGetAllTypeLong, totalPositions: mockPositionsScenarioGetAllTypeLong.length, totalPages: 1 });
            }
            if (page === 1 && limit === 20 && sortBy === 'size' && order === 'asc') {
                return Promise.resolve({ data: mockPositionsScenarioGetAllSortSizeAscending, totalPositions: mockPositionsScenarioGetAllSortSizeAscending.length, totalPages: 1 });
            }
            return Promise.resolve({ data: [], totalPositions: 0, totalPages: 0 });
        });
        positionProxy.update.mockResolvedValue();
        positionProxy.delete.mockResolvedValue();
    });

    test('Renders positions on first page', async () => {
        render(<Page />);

        await Promise.all(
            mockPositionsGetAllNoParameters.map(async (position) => {
                expect(await screen.findByText(position.security)).toBeInTheDocument();
            })
        );
    });

    test('Deletes the position for Apple (AAPL)', async () => {
        positionProxy.getRisksByIds.mockResolvedValue([]);
        render(<Page />);

        expect(await screen.findByText('Apple Inc')).toBeInTheDocument();

        const deleteButton = await screen.findByRole('button', { name: /delete position for apple inc/i });
        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(positionProxy.delete).toHaveBeenCalledWith(testPositionsShort[0].id);
        });
        expect(await screen.findByText('Apple Inc')).not.toBeInTheDocument();
    });

    test('Updates the position for Apple (AAPL)', async () => {
        positionProxy.getRisksByIds.mockResolvedValue([]);
        
        render(<Page />);

        expect(await screen.findByText('Apple Inc')).toBeInTheDocument();

        const toggleDiv = await screen.findByLabelText(`Toggle details for position for Apple Inc`);
        fireEvent.click(toggleDiv);

        const updateButton = await screen.findByRole('button', { name: /update position for apple inc/i });
        fireEvent.click(updateButton);

        await waitFor(() => {
            expect(positionProxy.update).toHaveBeenCalledWith(expect.objectContaining({ id: testPositionsShort[0].id }));
        });
        expect(await screen.findByText('Update successful!', {}, {timeout: 3000})).toBeInTheDocument();
    });

    test('Filters type long positions', async () => {
        render(<Page />);        

        await Promise.all(
            mockPositionsGetAllNoParameters.map(async (position) => {
                expect(await screen.findByText(position.security)).toBeInTheDocument();
            })
        );

        const filterLongRadioButton = screen.getByLabelText('Long');
        fireEvent.click(filterLongRadioButton);

        await waitFor(() => {
            expect(screen.queryByText('Alphabet Inc')).not.toBeInTheDocument();
        });

        await Promise.all(
            mockPositionsScenarioGetAllTypeLong.map(async (position) => {
                expect(await screen.findByText(position.security)).toBeInTheDocument();
            })
        );

        mockPositionsScenarioGetAllTypeShort.forEach((position) => {
            expect(screen.queryByText(position.security)).not.toBeInTheDocument();
        });
    });

    test('Sorts positions by size in ascending order', async () => {
        render(<Page />);

        await Promise.all(
            mockPositionsGetAllNoParameters.map(async (position) => {
                expect(await screen.findByText(position.security)).toBeInTheDocument();
            })
        );

        const sortSelect = screen.getByLabelText('Sort by');
        fireEvent.change(sortSelect, { target: { value: 'size' } });

        const sortedPositions = mockPositionsScenarioGetAllSortSizeAscending.map(p => p.security);

        const renderedElements = await screen.findAllByText(
            (content, _) => sortedPositions.includes(content)
        );

        const renderedTexts = renderedElements.map(el => el.textContent);

        expect(renderedTexts).toEqual(sortedPositions);
    });
});
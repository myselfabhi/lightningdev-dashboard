import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import DashboardLayout from '../../DashboardLayout/DashboardLayout';
import styles from './Invoices.module.css';

type Invoice = {
  id: string;
  plan: string;
  status: string; // "Ends in X days"
  type: string;
  paymentStatus: string; // "Paid" or "Unpaid"
  amount: number;
  bandwidth: string; // e.g., "0.15 GB"
  processor: string; // e.g., "MANUAL"
  dateTime: string; // e.g., "Dec 2, 2024 00:23"
};

const InvoicesPage: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);
  const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState<'All' | 'Paid' | 'Unpaid'>('All');

  useEffect(() => {
    const fetchInvoices = async () => {
      const mockInvoices: Invoice[] = [
        {
          id: '674cb0b5f674e52455084591',
          plan: '[Trial] Trial-Residential-Plan 0.15 GB',
          status: 'Ends in 23 days',
          type: 'Residential',
          paymentStatus: 'Paid',
          amount: 0.0,
          bandwidth: '0.15 GB',
          processor: 'MANUAL',
          dateTime: 'Dec 2, 2024 00:23',
        },
      ];
      setInvoices(mockInvoices);
      setFilteredInvoices(mockInvoices);
    };

    fetchInvoices();
  }, []);

  useEffect(() => {
    let result = invoices;

    if (search) {
      result = result.filter((invoice) =>
        invoice.id.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filter !== 'All') {
      result = result.filter((invoice) => invoice.paymentStatus === filter);
    }

    setFilteredInvoices(result);
  }, [search, filter, invoices]);

  return (
    <DashboardLayout>
      <div className={styles.InvoiceHeader}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h4 className={styles.title}>Your Invoices</h4>
            <p className={styles.subtitle}>
              Detailed list of all your invoices
            </p>
          </div>
          <div>
            <span>Need Support?</span>
          <a href="/support" className={styles.contactButton}>
            Contact Us
          </a>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className={styles.invoicesContainer}>
          <div className={styles.controls}>
            <div className={styles.searchBar}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search your invoices"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className={styles.filterButtons}>
              <span className={styles.sortLabel}>Sort by Payment:</span>
              <button
                className={`${styles.filterButton} ${
                  filter === 'Unpaid' ? styles.active : ''
                } ${styles.unpaid}`}
                onClick={() => setFilter('Unpaid')}
              >
                .Unpaid
              </button>
              <button
                className={`${styles.filterButton} ${
                  filter === 'Paid' ? styles.active : ''
                } ${styles.paid}`}
                onClick={() => setFilter('Paid')}
              >
                .Paid
              </button>
            </div>
          </div>

          {/* Horizontal Line */}
          <hr className={styles.blueHr} />

          {/* Invoices Table */}
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Plan</th>
                  <th>Status</th>
                  <th>Type</th>
                  <th>Payment Status</th>
                  <th>Amount</th>
                  <th>Bandwidth</th>
                  <th>Processor</th>
                  <th>Date & Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.length > 0 ? (
                  filteredInvoices.map((invoice) => (
                    <tr key={invoice.id}>
                      <td>{invoice.id}</td>
                      <td>{invoice.plan}</td>
                      <td>
                        <span className={styles.status}>{invoice.status}</span>
                      </td>
                      <td>{invoice.type}</td>
                      <td>
                        <span
                          className={`${styles.paymentStatus} ${
                            invoice.paymentStatus === 'Paid'
                              ? styles.paidStatus
                              : styles.unpaidStatus
                          }`}
                        >
                          {invoice.paymentStatus}
                        </span>
                      </td>
                      <td>${invoice.amount.toFixed(2)}</td>
                      <td>{invoice.bandwidth}</td>
                      <td>{invoice.processor}</td>
                      <td>{invoice.dateTime}</td>
                      <td>-</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className={styles.noInvoices}>
                      No invoices found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InvoicesPage;

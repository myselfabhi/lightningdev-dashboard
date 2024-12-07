import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "./Invoices.module.css";
import DashboardLayout from "../../DashboardLayout/DashboardLayout";

type Invoice = {
  id: string;
  plan: string;
  status: string; // "Ends in X days"
  type: string;
  paymentStatus: string; // "Paid" or "Unpaid"
  amount: number;
  bandwidth: string; // e.g., "0.15 GB"
};

const InvoicesPage: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<"All" | "Paid" | "Unpaid">("All");

  useEffect(() => {
    const fetchInvoices = async () => {
      const mockInvoices: Invoice[] = [
        {
          id: "674cb0b5f674e52455084591",
          plan: "[Trial] Trial-Residential-Plan 0.15 GB",
          status: "Ends in 25 days",
          type: "Residential",
          paymentStatus: "Paid",
          amount: 0.0,
          bandwidth: "0.15 GB",
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
        invoice.id.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (filter !== "All") {
      result = result.filter((invoice) => invoice.paymentStatus === filter);
    }

    setFilteredInvoices(result);
  }, [search, filter, invoices]);

  return (
    <DashboardLayout>
      <div className="invoices-container">
        <div className="header d-flex justify-content-between align-items-center mb-3">
          <div>
            <h4>Your Invoices</h4>
            <p className="text-muted">Detailed list of all your invoices</p>
          </div>
          <a href="/support" className="btn btn-primary">
            Contact Us
          </a>
        </div>

        {/* Search and Filter Section */}
        <div className="controls bg-white p-3 d-flex justify-content-between align-items-center">
          <div className="search-bar d-flex align-items-center">
            <FaSearch className="me-2 text-muted" />
            <input
              type="text"
              className="form-control"
              placeholder="Search your invoices"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-buttons d-flex align-items-center">
            <span className="sort-label me-2">Sort by Payment:</span>
            <button
              className={`chip-btn chip-red me-2 ${
                filter === "Unpaid" ? "chip-active" : ""
              }`}
              onClick={() => setFilter("Unpaid")}
            >
              .Unpaid
            </button>
            <button
              className={`chip-btn chip-green ${
                filter === "Paid" ? "chip-active" : ""
              }`}
              onClick={() => setFilter("Paid")}
            >
              . Paid
            </button>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="table-container bg-white mt-3 p-3 rounded">
          <table className="table">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Type</th>
                <th>Payment Status</th>
                <th>Amount</th>
                <th>Bandwidth</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td>{invoice.id}</td>
                    <td>{invoice.plan}</td>
                    <td>
                      <span className="chip chip-primary">
                        {invoice.status}
                      </span>
                    </td>
                    <td>{invoice.type}</td>
                    <td>
                      <span
                        className={`chip ${
                          invoice.paymentStatus === "Paid"
                            ? "chip-success"
                            : "chip-danger"
                        }`}
                      >
                        {invoice.paymentStatus}
                      </span>
                    </td>
                    <td>${invoice.amount.toFixed(2)}</td>
                    <td>{invoice.bandwidth}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center">
                    No invoices found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InvoicesPage;

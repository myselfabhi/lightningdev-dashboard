import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import "./Invoices.css";

type Invoice = {
  id: string;
  plan: string;
  status: string; // "Paid" or "Unpaid"
  type: string;
  paymentStatus: string; // "Paid"
  amount: number;
  bandwidth: string; // e.g., "5 GB"
  processor: string; // e.g., "CRYPTOCURRENCY"
  dateTime: string; // e.g., "2 Jun 2024 03:48"
};

const Invoices: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<"All" | "Paid" | "Unpaid">("All");

  useEffect(() => {
    // Simulate fetching invoices from an API
    const fetchInvoices = async () => {
      const fetchedInvoices: Invoice[] = [
        {
          id: "672576d20a6c581e87249045",
          plan: "Residential 5GB",
          status: "Ends in 3 months",
          type: "Residential",
          paymentStatus: "Paid",
          amount: 20.0,
          bandwidth: "5 GB",
          processor: "CRYPTOCURRENCY",
          dateTime: "2 Jun 2024 03:48",
        },
        // Add more mock invoices if needed
      ];
      setInvoices(fetchedInvoices);
      setFilteredInvoices(fetchedInvoices);
    };

    fetchInvoices();
  }, []);

  useEffect(() => {
    let result = invoices;

    // Filter by search
    if (search) {
      result = result.filter((invoice) =>
        invoice.id.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by payment status
    if (filter !== "All") {
      result = result.filter(
        (invoice) => invoice.paymentStatus === filter
      );
    }

    setFilteredInvoices(result);
  }, [search, filter, invoices]);

  return (
    <Layout>
      <div className="invoices-container container">
        <h4>Your Invoices</h4>
        <p>Detailed list of all your invoices</p>

        {/* Search and Filter Section */}
        <div className="invoices-controls d-flex justify-content-between align-items-center mb-3">
          <div className="search-bar">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Invoice ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-buttons">
            <button
              className={`btn btn-outline-danger me-2 ${
                filter === "Unpaid" ? "active" : ""
              }`}
              onClick={() => setFilter("Unpaid")}
            >
              Unpaid
            </button>
            <button
              className={`btn btn-outline-success ${
                filter === "Paid" ? "active" : ""
              }`}
              onClick={() => setFilter("Paid")}
            >
              Paid
            </button>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="table-responsive">
          <table className="table table-striped">
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td>{invoice.id}</td>
                    <td>{invoice.plan}</td>
                    <td>
                      <span className="badge bg-primary">{invoice.status}</span>
                    </td>
                    <td>{invoice.type}</td>
                    <td>
                      <span
                        className={`badge ${
                          invoice.paymentStatus === "Paid"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {invoice.paymentStatus}
                      </span>
                    </td>
                    <td>${invoice.amount.toFixed(2)}</td>
                    <td>{invoice.bandwidth}</td>
                    <td>{invoice.processor}</td>
                    <td>{invoice.dateTime}</td>
                    <td>
                      <button className="btn btn-link">View &gt;</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="text-center">
                    No invoices found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Placeholder */}
        <div className="pagination-controls d-flex justify-content-between align-items-center mt-4">
          <button className="btn btn-link">&laquo; Prev</button>
          <span>Page 1 of 97</span>
          <button className="btn btn-link">Next &raquo;</button>
        </div>
      </div>
    </Layout>
  );
};

export default Invoices;

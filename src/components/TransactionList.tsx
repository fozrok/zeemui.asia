import React, { useState, useEffect } from 'react';
import { addPropertyTransaction, getPropertyTransactions } from '../api/properties';
import { formatCurrency } from '../utils/format';
import { Plus, ChevronDown, ChevronUp, DollarSign, Calendar } from 'lucide-react';
import { z } from 'zod';

const transactionSchema = z.object({
  transaction_type: z.enum(["sale", "rent", "lease", "deposit", "withdrawal"], {
    errorMap: () => ({ message: "Please select a valid transaction type" })
  }),
  amount: z.number().positive("Amount must be a positive number"),
  notes: z.string().optional()
});

const TransactionList = ({ propertyId }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  // New transaction form state
  const [formData, setFormData] = useState({
    transaction_type: '',
    amount: '',
    notes: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  
  // Load transactions
  const loadTransactions = async () => {
    setLoading(true);
    try {
      const response = await getPropertyTransactions(propertyId);
      
      if (response.error) {
        setError(response.error.message);
      } else {
        setTransactions(response.data || []);
        setError(null);
      }
    } catch (err) {
      setError('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };
  
  // Load transactions on component mount
  useEffect(() => {
    if (propertyId) {
      loadTransactions();
    }
  }, [propertyId]);
  
  // Toggle expanded view
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  
  // Toggle form visibility
  const toggleForm = () => {
    setShowForm(!showForm);
    // Reset form data and errors when toggling
    if (!showForm) {
      setFormData({
        transaction_type: '',
        amount: '',
        notes: ''
      });
      setFormErrors({});
    }
  };
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    
    try {
      // Validate form data
      const parsedData = {
        ...formData,
        amount: Number(formData.amount),
        property_id: propertyId
      };
      
      transactionSchema.parse(parsedData);
      
      setSubmitting(true);
      
      // Submit transaction
      const { error } = await addPropertyTransaction(parsedData);
      
      if (error) {
        setFormErrors({ form: error.message });
        setSubmitting(false);
        return;
      }
      
      // Reset form and reload transactions
      setFormData({
        transaction_type: '',
        amount: '',
        notes: ''
      });
      await loadTransactions();
      setShowForm(false);
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Transform Zod errors into a more usable format
        const fieldErrors = {};
        error.errors.forEach(err => {
          const field = err.path.join('.');
          fieldErrors[field] = err.message;
        });
        setFormErrors(fieldErrors);
      } else {
        setFormErrors({ form: 'An unexpected error occurred' });
      }
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleExpanded}
      >
        <h3 className="text-xl font-semibold text-gray-800">
          Property Transactions
        </h3>
        <button className="text-gray-500 hover:text-gray-700">
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
      
      {isExpanded && (
        <div className="mt-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-md mb-4">
              {error}
            </div>
          )}
          
          {loading ? (
            <div className="text-center py-4">
              <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-2 text-gray-600">Loading transactions...</p>
            </div>
          ) : (
            <>
              {transactions.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-2 px-4 text-left text-gray-700">Date</th>
                        <th className="py-2 px-4 text-left text-gray-700">Type</th>
                        <th className="py-2 px-4 text-left text-gray-700">Amount</th>
                        <th className="py-2 px-4 text-left text-gray-700">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map(transaction => (
                        <tr key={transaction.id} className="border-t border-gray-100">
                          <td className="py-2 px-4">
                            {new Date(transaction.date).toLocaleDateString()}
                          </td>
                          <td className="py-2 px-4 capitalize">
                            {transaction.transaction_type}
                          </td>
                          <td className="py-2 px-4">
                            {formatCurrency(transaction.amount)}
                          </td>
                          <td className="py-2 px-4">
                            {transaction.notes || '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600 py-4">No transactions recorded yet.</p>
              )}
              
              <div className="mt-4">
                {showForm ? (
                  <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-md">
                    {formErrors.form && (
                      <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-md mb-4">
                        {formErrors.form}
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Transaction Type*
                        </label>
                        <select
                          name="transaction_type"
                          value={formData.transaction_type}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border ${formErrors.transaction_type ? 'border-red-300' : 'border-gray-300'} rounded-md`}
                          required
                        >
                          <option value="">Select Type</option>
                          <option value="sale">Sale</option>
                          <option value="rent">Rent</option>
                          <option value="lease">Lease</option>
                          <option value="deposit">Deposit</option>
                          <option value="withdrawal">Withdrawal</option>
                        </select>
                        {formErrors.transaction_type && (
                          <p className="text-red-500 text-sm mt-1">{formErrors.transaction_type}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Amount (THB)*
                        </label>
                        <input
                          type="number"
                          name="amount"
                          value={formData.amount}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border ${formErrors.amount ? 'border-red-300' : 'border-gray-300'} rounded-md`}
                          required
                        />
                        {formErrors.amount && (
                          <p className="text-red-500 text-sm mt-1">{formErrors.amount}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Notes
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      ></textarea>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={toggleForm}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="px-4 py-2 bg-custom-green text-white rounded-md hover:bg-custom-green-600 flex items-center"
                      >
                        {submitting ? (
                          <>
                            <div className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <DollarSign size={16} className="mr-1" />
                            Add Transaction
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={toggleForm}
                    className="flex items-center text-custom-green hover:text-custom-green-600"
                  >
                    <Plus size={16} className="mr-1" />
                    Add Transaction
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TransactionList;
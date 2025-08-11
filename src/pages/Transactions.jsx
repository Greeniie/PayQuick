// pages/Dashboard.jsx
import { useSelector, useDispatch } from "react-redux";
import { selectProfile } from "../redux/profileSlice";
import { selectTransactions } from "../redux/transactionSlice";
import TransactionsTable from "../components/TransactionTable";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const profile = useSelector(selectProfile);
  const transactions = useSelector(selectTransactions);

  const handleLogout = () => {
    dispatch({ type: "auth/logout" });
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8 flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <aside className="bg-white rounded-lg shadow p-5 sm:p-6 md:p-8 w-full md:w-72 flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-4 mb-5 sm:mb-6">
            <img
              src={profile?.photo || "https://i.pravatar.cc/150?img=1"}
              alt={`${profile?.name || user?.name}'s avatar`}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover shadow-sm"
            />
            <div className="truncate">
              <h2 className="text-lg sm:text-xl font-semibold truncate">
                {profile?.name || user?.name}
              </h2>
              <p className="text-gray-500 text-sm sm:text-base truncate">
                @{profile?.username || "username"}
              </p>
            </div>
          </div>

          <div className="text-gray-700 space-y-1 sm:space-y-2 text-sm sm:text-base">
            <p className="truncate">
              <span className="font-medium">Email:</span>{" "}
              {profile?.email || user?.email || "N/A"}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-blue-500 hover:bg-blue-600 transition-all duration-200 text-white rounded-lg py-3 text-lg font-semibold mt-4"
        >
          Log Out
        </button>
      </aside>

  
      <main className="flex-1 bg-white rounded-lg shadow p-5 sm:p-6 md:p-8 overflow-x-auto">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Transactions</h2>
        {transactions.length === 0 ? (
          <p className="text-gray-500 text-sm sm:text-base">
            No transactions found.
          </p>
        ) : (
          <TransactionsTable data={transactions} />
        )}
      </main>
    </div>
  );
};

export default Dashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../api/api";
import { House } from "lucide-react";

const statusConfig = {
  pending: { label: "Pending", color: "bg-blue-100 text-blue-800" },
  shipped: { label: "Shipped", color: "bg-green-100 text-green-800" },
  delivered: { label: "Delivered", color: "bg-yellow-100 text-yellow-800" },
  completed: { label: "Completed", color: "bg-gray-200 text-gray-800" },
  canceled: { label: "Canceled", color: "bg-red-100 text-red-800" },
};

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loadingOrderId, setLoadingOrderId] = useState(null);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/orders`);
        if (res.data) {
          setOrders(res.data.orders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        alert("Failed to fetch orders. Please try again later.");
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = (_id, key) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === _id ? { ...order, [key]: true } : order
      )
    );
  };

  const handleStatusChange = async (_id, statusKey, apiPath) => {
    setLoadingOrderId(_id);
    try {
      const res = await axios.get(`${BASE_URL}${apiPath}/${_id}`);
      if (res.data.status) {
        alert(
          statusKey === "status2"
            ? "You took product from godown"
            : statusKey === "status3"
            ? "You delivered product to client"
            : "You sent cash to admin"
        );
        updateOrderStatus(_id, statusKey);
      }
    } catch (err) {
      alert("Something went wrong. Try again.");
    } finally {
      setLoadingOrderId(null);
    }
  };

  const renderButton = (order) => {
    const { _id, cancel, cashadmin, status2, status3 } = order;
    const isLoading = loadingOrderId === _id;

    if (cancel)
      return (
        <span className="px-3 py-1 rounded-full bg-red-100 text-red-800">
          Canceled
        </span>
      );
    if (cashadmin)
      return (
        <span
          className={`px-3 py-1 rounded-full ${statusConfig.completed.color}`}
        >
          {statusConfig.completed.label}
        </span>
      );

    if (!status2) {
      return (
        <button
          onClick={() => handleStatusChange(_id, "status2", "/shipping")}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          {isLoading ? "Loading..." : "Mark Shipped"}
        </button>
      );
    }
    if (!status3) {
      return (
        <button
          onClick={() => handleStatusChange(_id, "status3", "/delivered")}
          disabled={isLoading}
          className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
        >
          {isLoading ? "Loading..." : "Mark Delivered"}
        </button>
      );
    }
    return (
      <button
        onClick={() => handleStatusChange(_id, "cashadmin", "/cashupdate")}
        disabled={isLoading}
        className="px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition"
      >
        {isLoading ? "Loading..." : "Cash Transfer to Admin"}
      </button>
    );
  };

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold mb-6">Your Orders</h2>
        {loadingOrders ? (
          <div className="text-center py-20">
            <span className="text-xl text-gray-600 animate-pulse">
              Loading orders...
            </span>
          </div>
        ) : orders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => {
              const {
                _id,
                date,
                deliveryDetails,
                total,
                product,
                paymentMethod,
                cancel,
                cashadmin,
                status2,
                status3,
              } = order;

              let statusKey = "pending";
              if (cancel) statusKey = "canceled";
              else if (cashadmin) statusKey = "completed";
              else if (status3) statusKey = "delivered";
              else if (status2) statusKey = "shipped";

              return (
                <div
                  key={_id}
                  className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold">
                        {deliveryDetails.name}
                      </h3>
                      <span className="text-sm text-gray-500">{date}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">
                      📞 {deliveryDetails.mobile}
                    </p>
                    <div className="flex text-gray-600 text-sm mb-2">
                      <House size={18} className="mr-1 text-yellow-500" />{" "}
                      {deliveryDetails.address}, {deliveryDetails.city},{" "}
                      {deliveryDetails.state} - {deliveryDetails.pinncode}
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-medium">
                        Total: ₹{total || product?.Price}
                      </span>
                      <span className="text-sm italic">
                        {paymentMethod || "COD"}
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full ${statusConfig[statusKey].color}`}
                    >
                      {statusConfig[statusKey].label}
                    </span>
                    {renderButton(order)}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <h4 className="text-xl text-gray-500">
              You don't have any orders yet
            </h4>
          </div>
        )}
      </div>
    </section>
  );
};

export default OrderList;

import React, { useState, useEffect } from 'react';
import { useNewPropertyListings, usePropertyStatusChanges, usePropertyPriceUpdates } from '../hooks/useRealtime';
import { Bell, X, Home, DollarSign, Eye } from 'lucide-react';
import { formatCurrency } from '../utils/format';

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  
  // Handle new property notification
  const handleNewProperty = (newProperty) => {
    addNotification({
      type: 'new',
      title: 'New Property Listed',
      message: `${newProperty.title} has been added to our listings.`,
      data: newProperty,
      icon: <Home className="text-green-500" size={18} />
    });
  };
  
  // Handle property status change notification
  const handleStatusChange = (property) => {
    addNotification({
      type: 'status',
      title: 'Property Status Updated',
      message: `${property.title} is now ${property.active ? 'active' : 'inactive'}.`,
      data: property,
      icon: <Eye className={property.active ? 'text-green-500' : 'text-red-500'} size={18} />
    });
  };
  
  // Handle price update notification
  const handlePriceUpdate = (data) => {
    const { property, oldPrice, newPrice } = data;
    addNotification({
      type: 'price',
      title: 'Price Updated',
      message: `${property.title} price changed from ${formatCurrency(oldPrice)} to ${formatCurrency(newPrice)}.`,
      data: property,
      icon: <DollarSign className="text-amber-500" size={18} />
    });
  };
  
  // Add a notification
  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      ...notification,
      read: false,
      timestamp: new Date()
    };
    
    setNotifications(prev => [newNotification, ...prev.slice(0, 9)]); // Keep max 10 notifications
    setUnreadCount(prev => prev + 1);
  };
  
  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
    setUnreadCount(0);
  };
  
  // Mark a single notification as read
  const markAsRead = (id) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };
  
  // Clear all notifications
  const clearAll = () => {
    setNotifications([]);
    setUnreadCount(0);
  };
  
  // Remove a single notification
  const removeNotification = (id) => {
    const notification = notifications.find(n => n.id === id);
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
    setNotifications(prev => prev.filter(n => n.id !== id));
  };
  
  // Toggle notification panel
  const toggleNotifications = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      markAllAsRead();
    }
  };
  
  // Set up real-time subscriptions
  useNewPropertyListings(handleNewProperty);
  usePropertyStatusChanges(handleStatusChange);
  usePropertyPriceUpdates(handlePriceUpdate);
  
  // Format time
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={toggleNotifications}
        className="relative p-2 rounded-full hover:bg-gray-100"
        aria-label="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>
      
      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 overflow-hidden">
          <div className="bg-gray-50 py-2 px-4 flex justify-between items-center border-b">
            <h3 className="font-medium">Notifications</h3>
            <div className="flex space-x-2">
              <button
                onClick={markAllAsRead}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                Mark all as read
              </button>
              <button
                onClick={clearAll}
                className="text-xs text-gray-600 hover:text-gray-800"
              >
                Clear all
              </button>
            </div>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              <div>
                {notifications.map(notification => (
                  <div
                    key={notification.id}
                    className={`py-3 px-4 border-b border-gray-100 hover:bg-gray-50 ${
                      !notification.read ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex justify-between">
                      <div className="flex space-x-2">
                        <div className="mt-0.5">
                          {notification.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          <p className="text-xs text-gray-600">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {formatTime(notification.timestamp)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeNotification(notification.id);
                        }}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500">
                <p>No notifications</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
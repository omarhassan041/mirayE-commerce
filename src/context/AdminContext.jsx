// src/context/AdminContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

// ========================================
// Create Admin Context
// ========================================
const AdminContext = createContext();

// ========================================
// Admin Provider Component
// ========================================
export const AdminProvider = ({ children }) => {
  // ===== State Management =====
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    recentOrders: [],
    pendingOrders: 0,
  });
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  // ===== Check Admin Status on Load =====
  useEffect(() => {
    checkAdminStatus();
  }, []);

  // ===== Admin Authentication =====
  const checkAdminStatus = () => {
    const adminToken = localStorage.getItem('adminToken');
    const adminData = localStorage.getItem('adminData');
    
    if (adminToken && adminData) {
      setIsAdmin(true);
      setAdminUser(JSON.parse(adminData));
      fetchDashboardData();
    }
    setIsLoading(false);
  };

  const adminLogin = (email, password) => {
    setIsLoading(true);
    
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Demo admin credentials
        const demoAdmin = {
          email: 'admin@miraymarket.com',
          password: 'admin123',
        };

        if (email === demoAdmin.email && password === demoAdmin.password) {
          const adminData = {
            id: 'admin-001',
            name: 'Admin',
            email: demoAdmin.email,
            role: 'super_admin',
            avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=F59E0B&color=fff',
          };
          
          localStorage.setItem('adminToken', 'admin-token-123456');
          localStorage.setItem('adminData', JSON.stringify(adminData));
          
          setIsAdmin(true);
          setAdminUser(adminData);
          setIsLoading(false);
          toast.success('Welcome Admin! 👋');
          resolve(adminData);
        } else {
          setIsLoading(false);
          toast.error('Invalid admin credentials!');
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const adminLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    setIsAdmin(false);
    setAdminUser(null);
    toast.success('Logged out successfully');
  };

  // ===== Dashboard Data =====
  const fetchDashboardData = () => {
    // Simulate fetching dashboard data
    const mockStats = {
      totalProducts: 156,
      totalOrders: 89,
      totalUsers: 245,
      totalRevenue: 45230,
      recentOrders: [
        { id: 'ORD-001', customer: 'Ahmed Ali', amount: 45.00, status: 'delivered', date: '2024-01-15' },
        { id: 'ORD-002', customer: 'Fatima Omar', amount: 78.50, status: 'pending', date: '2024-01-16' },
        { id: 'ORD-003', customer: 'Mohamed Hassan', amount: 120.00, status: 'processing', date: '2024-01-17' },
        { id: 'ORD-004', customer: 'Safia Abdi', amount: 34.99, status: 'pending', date: '2024-01-18' },
        { id: 'ORD-005', customer: 'Ali Hussein', amount: 67.50, status: 'delivered', date: '2024-01-19' },
      ],
      pendingOrders: 3,
    };

    const mockProducts = [
      { id: 1, name: 'Product 1', price: 29.99, category: 'Electronics', stock: 45, status: 'active' },
      { id: 2, name: 'Product 2', price: 49.99, category: 'Clothing', stock: 30, status: 'active' },
      { id: 3, name: 'Product 3', price: 19.99, category: 'Books', stock: 10, status: 'low_stock' },
      { id: 4, name: 'Product 4', price: 99.99, category: 'Electronics', stock: 0, status: 'out_of_stock' },
    ];

    const mockOrders = [
      { id: 'ORD-001', customer: 'Ahmed Ali', total: 45.00, status: 'delivered', items: 2 },
      { id: 'ORD-002', customer: 'Fatima Omar', total: 78.50, status: 'pending', items: 3 },
      { id: 'ORD-003', customer: 'Mohamed Hassan', total: 120.00, status: 'processing', items: 4 },
    ];

    const mockUsers = [
      { id: 1, name: 'Ahmed Ali', email: 'ahmed@email.com', status: 'active', joined: '2024-01-01' },
      { id: 2, name: 'Fatima Omar', email: 'fatima@email.com', status: 'active', joined: '2024-01-02' },
      { id: 3, name: 'Mohamed Hassan', email: 'mohamed@email.com', status: 'inactive', joined: '2024-01-03' },
    ];

    setDashboardStats(mockStats);
    setProducts(mockProducts);
    setOrders(mockOrders);
    setUsers(mockUsers);
  };

  // ===== Product Management =====
  const addProduct = (productData) => {
    const newProduct = {
      id: Date.now(),
      ...productData,
      createdAt: new Date().toISOString(),
    };
    setProducts(prev => [newProduct, ...prev]);
    toast.success('Product added successfully! ✅');
    return newProduct;
  };

  const updateProduct = (productId, updatedData) => {
    setProducts(prev => prev.map(product => 
      product.id === productId 
        ? { ...product, ...updatedData, updatedAt: new Date().toISOString() }
        : product
    ));
    toast.success('Product updated successfully! ✅');
  };

  const deleteProduct = (productId) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
    toast.success('Product deleted successfully! 🗑️');
  };

  // ===== Order Management =====
  const updateOrderStatus = (orderId, status) => {
    setOrders(prev => prev.map(order =>
      order.id === orderId
        ? { ...order, status, updatedAt: new Date().toISOString() }
        : order
    ));
    toast.success(`Order ${orderId} status updated to ${status}`);
  };

  const getOrdersByStatus = (status) => {
    return orders.filter(order => order.status === status);
  };

  // ===== User Management =====
  const toggleUserStatus = (userId) => {
    setUsers(prev => prev.map(user =>
      user.id === userId
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
    toast.success('User status updated!');
  };

  const deleteUser = (userId) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    toast.success('User deleted successfully!');
  };

  // ===== Dashboard Analytics =====
  const getTotalRevenue = () => {
    return dashboardStats.totalRevenue || 0;
  };

  const getPendingOrders = () => {
    return dashboardStats.pendingOrders || 0;
  };

  const getProductCount = () => {
    return dashboardStats.totalProducts || 0;
  };

  const getUserCount = () => {
    return dashboardStats.totalUsers || 0;
  };

  // ===== Context Value =====
  const value = {
    // Auth
    isAdmin,
    adminUser,
    isLoading,
    adminLogin,
    adminLogout,
    checkAdminStatus,
    
    // Dashboard
    dashboardStats,
    fetchDashboardData,
    getTotalRevenue,
    getPendingOrders,
    getProductCount,
    getUserCount,
    
    // Products
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    
    // Orders
    orders,
    updateOrderStatus,
    getOrdersByStatus,
    
    // Users
    users,
    toggleUserStatus,
    deleteUser,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

// ========================================
// Custom Hook to Use Admin Context
// ========================================
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export default AdminContext;
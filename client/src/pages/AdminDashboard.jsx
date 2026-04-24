import React, { useState, useEffect, useContext } from 'react';
import { 
  BarChart3, 
  Building2, 
  MessageSquare, 
  CreditCard, 
  Calendar, 
  Users, 
  LogOut, 
  Plus, 
  Edit3, 
  Trash2, 
  UploadCloud, 
  X,
  CheckCircle,
  LayoutDashboard,
  Bell,
  Briefcase,
  Handshake,
  Mail,
  TrendingUp,
  DollarSign,
  PieChart as PieIcon
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area, LineChart, Line 
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import { AuthContext } from '../context/AuthContext';
import Toast from '../components/Toast';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('analytics');
  const [selectedMetric, setSelectedMetric] = useState('roi');
  const [toast, setToast] = useState(null);
  const { user, loading: authLoading, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Projects State
  const [projects, setProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    type: 'Flat',
    city: 'Mumbai',
    location: '',
    price: '',
    lat: '',
    lng: '',
    description: '',
    amenities: [],
    status: 'Available',
    isFeatured: false,
    notifyUsers: false
  });
  
  const [broadcastData, setBroadcastData] = useState({
    subject: '',
    message: '',
    type: 'Event'
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [brochure, setBrochure] = useState(null);
  const [loading, setLoading] = useState(false);
  const [csvFile, setCsvFile] = useState(null);
  const [alerts, setAlerts] = useState([]);

  const [counts, setCounts] = useState({ 
    inquiries: 0, 
    visits: 0, 
    alerts: 0, 
    payments: 0,
    partnerLeads: 0,
    brokerLeads: 0,
    newsletter: 0,
    users: 0
  });
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [payments, setPayments] = useState([]);
  const [visits, setVisits] = useState([]);
  const [newsletterSubscribers, setNewsletterSubscribers] = useState([]);
  
  // Mock Data for demonstration
  const [partnerLeads, setPartnerLeads] = useState([
    { _id: 'p1', name: 'Raj Kumar', phone: '9876543210', city: 'Mumbai', experience: '5-8 Years', status: 'Pending' },
    { _id: 'p2', name: 'Anjali Sharma', phone: '9123456789', city: 'Pune', experience: '2-5 Years', status: 'Contacted' },
    { _id: 'p3', name: 'Vivek Singh', phone: '9988776655', city: 'Indore', experience: '8+ Years', status: 'Onboarded' },
    { _id: 'p4', name: 'Sandhya Rao', phone: '9456123789', city: 'Delhi', experience: '1-3 Years', status: 'Pending' },
    { _id: 'p5', name: 'Mohit Varma', phone: '9785641230', city: 'Gurgaon', experience: '5-10 Years', status: 'Contacted' },
    { _id: 'p6', name: 'Sonal Patel', phone: '9632587410', city: 'Ahmedabad', experience: '3-5 Years', status: 'Pending' },
    { _id: 'p7', name: 'Ishan Gupta', phone: '9512364780', city: 'Bhopal', experience: '10+ Years', status: 'Onboarded' },
    { _id: 'p8', name: 'Riya Malhotra', phone: '9147258369', city: 'Bangalore', experience: '2-4 Years', status: 'Pending' },
    { _id: 'p9', name: 'Aditya Das', phone: '9854712365', city: 'Kolkata', experience: '5-8 Years', status: 'Contacted' },
    { _id: 'p10', name: 'Pooja Hegde', phone: '9125478364', city: 'Hyderabad', experience: '3-6 Years', status: 'Pending' }
  ]);

  const [brokerLeads, setBrokerLeads] = useState([
    { _id: 'f1', email: 'rahul.sharma@broker.com', status: 'Pending', createdAt: '2026-04-10T10:00:00Z' },
    { _id: 'f2', email: 'priya.verma@realty.in', status: 'Contacted', createdAt: '2026-04-09T14:30:00Z' },
    { _id: 'f3', email: 'amit.gupta@indoreestate.com', status: 'Onboarded', createdAt: '2026-04-08T09:15:00Z' },
    { _id: 'f4', email: 'sanjay.mishra@globalprop.com', status: 'Pending', createdAt: '2026-04-07T11:45:00Z' },
    { _id: 'f5', email: 'anita.desai@punehomes.com', status: 'Pending', createdAt: '2026-04-06T16:20:00Z' },
    { _id: 'f6', email: 'vikram.singh@luxebrokers.in', status: 'Contacted', createdAt: '2026-04-05T13:10:00Z' },
    { _id: 'f7', email: 'deepa.nair@coastalrealty.com', status: 'Onboarded', createdAt: '2026-04-04T10:05:00Z' },
    { _id: 'f8', email: 'manish.jain@commercialhub.com', status: 'Pending', createdAt: '2026-04-03T15:55:00Z' },
    { _id: 'f9', email: 'rohan.mehta@mumbaiapartments.in', status: 'Pending', createdAt: '2026-04-02T12:40:00Z' },
    { _id: 'f10', email: 'swati.patel@gujaratprops.com', status: 'Contacted', createdAt: '2026-04-01T08:30:00Z' },
    { _id: 'f11', email: 'arjun.kapoor@delhiesate.in', status: 'Pending', createdAt: '2026-03-31T17:15:00Z' },
    { _id: 'f12', email: 'sneha.reddy@hyderabadliving.com', status: 'Onboarded', createdAt: '2026-03-30T14:25:00Z' },
    { _id: 'f13', email: 'karan.josh@bangalorehomes.in', status: 'Pending', createdAt: '2026-03-29T11:50:00Z' },
    { _id: 'f14', email: 'neha.tyagi@gurgaonpremium.com', status: 'Pending', createdAt: '2026-03-28T09:00:00Z' },
    { _id: 'f15', email: 'rajesh.khanna@heritageprops.com', status: 'Contacted', createdAt: '2026-03-27T16:45:00Z' },
    { _id: 'f16', email: 'pooja.bose@kolkatarealty.in', status: 'Pending', createdAt: '2026-03-26T13:35:00Z' },
    { _id: 'f17', email: 'abhishek.yadav@upwards.com', status: 'Onboarded', createdAt: '2026-03-25T10:10:00Z' },
    { _id: 'f18', email: 'tanvi.shah@ahmedabadprop.com', status: 'Pending', createdAt: '2026-03-24T15:20:00Z' },
    { _id: 'f19', email: 'manoj.tiwari@patnaestate.in', status: 'Contacted', createdAt: '2026-03-23T12:05:00Z' },
    { _id: 'f20', email: 'isha.khare@centralindia.com', status: 'Pending', createdAt: '2026-03-22T08:55:00Z' }
  ]);
  
  const [managedPages, setManagedPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState('jagdish-bhawan');
  const [pageContent, setPageContent] = useState({
    pageName: 'jagdish-bhawan',
    metadata: {
      title: 'Jagdish Bhawan',
      subtitle: 'Commercial Excellence in Sarafa Bazaar',
      heroImage: '/jagdish_bhawan_user.jpg',
      nightImage: '/jagdish_bhawan_night_user.png'
    },
    sections: []
  });
  const fetchCounts = async () => {
    try {
      const qInq = await fetch('/api/inquiries');
      const dInq = await qInq.json();
      const qVis = await fetch('/api/visits');
      const dVis = await qVis.json();
      const qAlt = await fetch('/api/alerts');
      const dAlt = await qAlt.json();
      const qPay = await fetch('/api/payments');
      const dPay = await qPay.json();
      const qPart = await fetch('/api/partner-leads');
      const dPart = await qPart.json();
      const qBro = await fetch('/api/broker-leads');
      const dBro = await qBro.json();
      const qNews = await fetch('/api/newsletter');
      const dNews = await qNews.json();
      const qUser = await fetch('/api/users');
      const dUser = await qUser.json();
      
      const dataInq = Array.isArray(dInq) ? dInq : [];
      const dataVis = Array.isArray(dVis) ? dVis : [];
      const dataAlt = Array.isArray(dAlt) ? dAlt : [];
      const dataPay = Array.isArray(dPay) ? dPay : [];
      const dataPart = Array.isArray(dPart) ? dPart : [];
      const dataBro = Array.isArray(dBro) ? dBro : [];
      const dataNews = Array.isArray(dNews) ? dNews : [];
      const qPage = await fetch('/api/page-content/jagdish-bhawan');
      const dPage = await qPage.json();

      setCounts({
        inquiries: dataInq.filter(i => !i.status || i.status === 'Pending').length,
        visits: dataVis.filter(v => v.status === 'Pending' || v.status === 'Scheduled' || v.status === 'Confirmed').length,
        alerts: dataAlt.length,
        payments: dataPay.length,
        partnerLeads: dataPart.filter(p => !p.status || p.status === 'Pending').length,
        brokerLeads: dataBro.filter(b => !b.status || b.status === 'Pending').length,
        newsletter: dataNews.length,
        users: (Array.isArray(dUser) && dUser.length > 0) ? dUser.length : 32
      });
    } catch (err) { console.error(err); }
  };

  // Helper to format price in Indian units (Lakh/Cr)
  const formatIndianPrice = (price) => {
    if (!price) return 'N/A';
    if (price >= 10000000) return `${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `${(price / 100000).toFixed(2)} Lakh`;
    return price.toLocaleString('en-IN');
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (!authLoading) {
      if (!user || user.role !== 'admin') {
        navigate('/auth');
      }
    }
    fetchCounts();
    fetchData();
  }, [user, authLoading, activeTab, selectedPage]);

  const fetchData = async () => {
    try {
      if (activeTab === 'projects' || activeTab === 'analytics') {
        const res = await fetch('/api/projects');
        const data = await res.json();
        setProjects(Array.isArray(data) ? data : []);
      }
      if (activeTab === 'inquiries') {
        const res = await fetch('/api/inquiries');
        const data = await res.json();
        setInquiries(Array.isArray(data) ? data : []);
      }
      if (activeTab === 'payments') {
        const res = await fetch('/api/payments');
        const data = await res.json();
        setPayments(Array.isArray(data) ? data : []);
      }
      if (activeTab === 'visits') {
        const res = await fetch('/api/visits');
        const data = await res.json();
        setVisits(data);
      }
      if (activeTab === 'alerts') {
        const res = await fetch('/api/alerts');
        const data = await res.json();
        setAlerts(data);
      }
      if (activeTab === 'partners' || activeTab === 'analytics') {
        const res = await fetch('/api/partner-leads');
        const data = await res.json();
        if (data.length > 0) {
          setPartnerLeads(prev => {
            const mocks = prev.filter(p => p._id.startsWith('p'));
            return [...data, ...mocks];
          });
        }
      }
      if (activeTab === 'brokers' || activeTab === 'analytics') {
        const res = await fetch('/api/broker-leads');
        const data = await res.json();
        if (data.length > 0) {
          setBrokerLeads(prev => {
            const mocks = prev.filter(b => b._id.startsWith('f'));
            return [...data, ...mocks];
          });
        }
      }
      if (activeTab === 'newsletter' || activeTab === 'analytics') {
        const res = await fetch('/api/newsletter');
        const data = await res.json();
        setNewsletterSubscribers(data);
      }
      if (activeTab === 'users' || activeTab === 'analytics') {
        try {
          const res = await fetch('/api/users');
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setRegisteredUsers(data);
          } else {
            // High-fidelity fallback for demonstration
            const mocks = Array.from({ length: 30 }).map((_, i) => ({
              _id: `mock-${i}`,
              name: `Executive Member ${i + 1}`,
              email: `user.${i + 1}@baserapremium.com`,
              role: i % 4 === 0 ? 'broker' : 'user',
              membershipLevel: i % 3 === 0 ? 'Yearly Value' : 'Basic Premium',
              isApproved: true,
              referralCode: `BSR-${5000 + i}`,
              createdAt: new Date(Date.now() - (i * 1.5 * 86400000)).toISOString()
            }));
            setRegisteredUsers(mocks);
          }
        } catch (err) {
          console.error("Failed to fetch users, using mocks", err);
        }
      }
      if (activeTab === 'pages') {
        // Fetch managed pages list
        const listRes = await fetch('/api/page-content');
        if (listRes.ok) {
          const listData = await listRes.json();
          setManagedPages(listData);
        }

        // Fetch selected page content
        const res = await fetch(`/api/page-content/${selectedPage}`);
        if (res.ok) {
          const data = await res.json();
          setPageContent(data);
        }
      }
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const handleBroadcast = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/admin/send-mass-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(broadcastData)
      });
      if (res.ok) {
        showToast('Broadcast sent successfully to all users!');
        setBroadcastData({ subject: '', message: '', type: 'Event' });
      } else {
        showToast('Failed to send broadcast', 'error');
      }
    } catch (err) {
      showToast('An error occurred', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCRMUpdate = async (type, id, updates) => {
    try {
      const endpoint = type === 'inquiry' ? `/api/inquiries/${id}` :
                       type === 'partner' ? `/api/partner-leads/${id}` :
                       `/api/broker-leads/${id}`;
      
      const res = await fetch(endpoint, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      
      if (res.ok) {
        showToast('Lead updated successfully');
        fetchData();
      }
    } catch (err) {
      showToast('Update failed', 'error');
    }
  };

  const addNote = async (type, id, content) => {
    try {
      const endpoint = type === 'inquiry' ? `/api/inquiries/${id}/notes` :
                       type === 'partner' ? `/api/partner-leads/${id}/notes` :
                       `/api/broker-leads/${id}/notes`;
      
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, author: user.name })
      });
      
      if (res.ok) {
        showToast('Note added');
        fetchData();
      }
    } catch (err) {
      showToast('Failed to add note', 'error');
    }
  };

  // Performance Optimization: Memoize filtered and sorted projects to prevent UI lag on search/render
  const filteredProjects = React.useMemo(() => {
    return projects
      .filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.city.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        // Featured Masterpieces first
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return 0;
      });
  }, [projects, searchTerm]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(prev => [...prev, ...files]);
    
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...previews]);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleAmenityToggle = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      type: 'Flat',
      city: 'Mumbai',
      location: '',
      price: '',
      lat: '',
      lng: '',
      description: '',
      amenities: [],
      status: 'Available',
      isFeatured: false
    });
    setImages([]);
    setImagePreviews([]);
    setBrochure(null);
    setCsvFile(null);
    setIsEditing(false);
    setEditingProject(null);
    setShowForm(false);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      type: project.type,
      city: project.city || 'Mumbai',
      location: project.location,
      price: project.price,
      lat: project.lat || '',
      lng: project.lng || '',
      description: project.description,
      amenities: project.amenities || [],
      status: project.status || 'Available',
      isFeatured: project.isFeatured || false
    });
    setImagePreviews(project.images || []);
    setBrochure(null);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'amenities') {
        data.append(key, formData[key].join(','));
      } else {
        data.append(key, formData[key]);
      }
    });

    images.forEach(img => {
      data.append('images', img);
    });
    if (brochure) {
      data.append('brochure', brochure);
    }

    try {
      const url = isEditing ? `/api/projects/${editingProject._id}` : '/api/projects';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        body: data
      });

      if (res.ok) {
        showToast(isEditing ? 'Property updated successfully!' : 'Property added successfully!');
        
        // If notifyUsers is checked, send broadcast
        if (formData.notifyUsers) {
          fetch('/api/admin/send-mass-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              subject: `New Property: ${formData.title}`,
              message: `A new property listing "${formData.title}" in ${formData.city} has been added to our exclusive collection. Check it out now!`,
              type: 'New Property Addition'
            })
          }).catch(err => console.error('Auto-broadcast failed:', err));
        }

        resetForm();
        fetchData();
        setShowForm(false);
      } else {
        showToast('Failed to save property', 'error');
      }
    } catch (err) {
      showToast('An error occurred', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleBulkUpload = async (e) => {
    e.preventDefault();
    if (!csvFile) return;
    setLoading(true);
    const data = new FormData();
    data.append('csv', csvFile);

    try {
      const res = await fetch('/api/projects/bulk', {
        method: 'POST',
        body: data
      });
      if (res.ok) {
        showToast('Bulk upload successful!');
        setCsvFile(null);
        fetchData();
      } else {
        showToast('Bulk upload failed', 'error');
      }
    } catch (err) {
      showToast('An error occurred', 'error');
    } finally {
      setLoading(false);
    }
  };

  const downloadCsvTemplate = () => {
    const headers = ['title', 'type', 'city', 'price', 'location', 'description', 'status', 'amenities', 'images'];
    const sampleRow = ['Sample Property', 'Flat', 'Mumbai', '15000000', 'Marine Drive', 'Luxury 3BHK with sea view', 'Available', 'Gym|Pool|Security', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00'];
    const csvContent = [headers.join(','), sampleRow.join(',')].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'property_bulk_template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
        if (res.ok) {
          showToast('Property deleted successfully!');
          fetchData();
        }
      } catch (err) {
        showToast('Failed to delete property', 'error');
      }
    }
  };

  const handleInquiryStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/inquiries/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        showToast(`Inquiry marked as ${status}`);
        fetchData();
      }
    } catch (err) {
      showToast('Failed to update inquiry status', 'error');
    }
  };

  const handleVisitStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/visits/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        showToast(`Visit marked as ${status}`);
        fetchData();
      }
    } catch (err) {
      showToast('Failed to update visit status', 'error');
    }
  };

  const toggleFeatured = async (id, currentStatus) => {
    const featuredCount = projects.filter(p => p.isFeatured && p.type?.toLowerCase() !== 'coastal').length;
    
    // Warning if adding past 15, but still allow it if they confirm
    if (!currentStatus && featuredCount >= 15) {
      if (!window.confirm("You already have 15+ properties in the Architectural Masterpieces section. Adding more might push others out of the main grid. Continue?")) {
        return;
      }
    }

    try {
      showToast('Updating Top 15 status...', 'info');
      const res = await fetch(`/api/projects/${id}/featured`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: !currentStatus })
      });
      if (res.ok) {
        showToast(currentStatus ? 'Removed from Top 15 Masterpieces' : 'Added to Top 15 Masterpieces');
        fetchData();
        fetchCounts();
      }
    } catch (err) {
      showToast('Update failed', 'error');
    }
  };

  const approveBroker = async (id) => {
      try {
          const token = localStorage.getItem('basera_token');
          const res = await fetch(`/api/admin/brokers/${id}/approve`, {
              method: 'PATCH',
              headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
              showToast('Broker approved successfully');
              fetchData();
          }
      } catch (err) {
          showToast('Approval failed', 'error');
      }
  };


  const predefinedAmenities = [
    'Gym', 'Swimming Pool', '24/7 Security', 'Ample Parking', 'Clubhouse', 
    'CCTV', 'Power Backup', 'Interior Gardens', 'Kids Play Area', 'Elevator',
    'High-speed Elevators', 'Reserved Parking', 'Valet Parking', 
    'Fully Equipped Gymnasium', 'Indoor Swimming Pool', 'Outdoor Swimming Pool',
    'Spa & Sauna', 'Yoga / Meditation Room', 'Jogging Track', 'Walking Track',
    'Indoor Games (TT, Billiards)', 'Outdoor Sports Courts', 'Tennis Court', 
    'Basketball Court', 'Mini Theatre', 'Screening Room', 'Party Hall', 
    'Banquet Space', 'Rooftop Lounge', 'Terrace Garden', 'Pet Park', 
    'Co-working Spaces', 'Business Lounge', 'Housekeeping Services',
    'Laundry & Dry Cleaning', 'Room Service', 'Maintenance Staff On-call',
    'EV Charging Stations', 'Smart Home Automation', 'High-speed Internet',
    'Wi-Fi Zones', 'Air Purification Systems', 'Private Elevators', 'Helipad',
    'Golf Simulator', 'Mini Golf Course', 'Private Cinema', 'Sky Lounges', 'Infinity Pools'
  ];

  const handlePageUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/page-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pageContent)
      });
      if (res.ok) {
        showToast('Page content updated successfully!');
      } else {
        showToast('Failed to update page content', 'error');
      }
    } catch (err) {
      showToast('An error occurred', 'error');
    } finally {
      setLoading(false);
    }
  };

  const renderPageEditor = () => (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", margin: 0 }}>Page Content Editor</h2>
          <p style={{ opacity: 0.6 }}>Manage storytelling pages and custom layouts</p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', fontWeight: 'bold' }}>SELECT PAGE:</span>
          <select 
            value={selectedPage} 
            onChange={(e) => setSelectedPage(e.target.value)}
            style={{ 
              background: 'rgba(255,255,255,0.05)', 
              border: '1px solid rgba(195,157,99,0.3)', 
              color: '#c39d63', 
              padding: '8px 20px', 
              borderRadius: '20px',
              outline: 'none',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {managedPages.map(p => (
              <option key={p.pageName} value={p.pageName}>{p.metadata?.title || p.pageName}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="glass-premium" style={{ padding: '30px' }}>
        <form onSubmit={handlePageUpdate}>
          <div style={{ marginBottom: '30px' }}>
            <h4 style={{ color: 'var(--primary)', marginBottom: '15px', borderBottom: '1px solid rgba(195,157,99,0.1)', paddingBottom: '10px' }}>Page Settings: {pageContent.pageName}</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="crm-field">
                <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: '5px' }}>Project Title</label>
                <input 
                  type="text" 
                  value={pageContent.metadata.title} 
                  onChange={(e) => setPageContent({...pageContent, metadata: {...pageContent.metadata, title: e.target.value}})}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '10px', borderRadius: '8px' }}
                />
              </div>
              <div className="crm-field">
                <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: '5px' }}>Subtitle</label>
                <input 
                  type="text" 
                  value={pageContent.metadata.subtitle} 
                  onChange={(e) => setPageContent({...pageContent, metadata: {...pageContent.metadata, subtitle: e.target.value}})}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '10px', borderRadius: '8px' }}
                />
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <h4 style={{ color: 'var(--primary)', marginBottom: '15px' }}>Visual Assets</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="crm-field">
                <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: '5px' }}>Hero Image Path</label>
                <input 
                  type="text" 
                  value={pageContent.metadata.heroImage} 
                  onChange={(e) => setPageContent({...pageContent, metadata: {...pageContent.metadata, heroImage: e.target.value}})}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '10px', borderRadius: '8px' }}
                />
              </div>
              <div className="crm-field">
                <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: '5px' }}>Night View Image Path</label>
                <input 
                  type="text" 
                  value={pageContent.metadata.nightImage} 
                  onChange={(e) => setPageContent({...pageContent, metadata: {...pageContent.metadata, nightImage: e.target.value}})}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '10px', borderRadius: '8px' }}
                />
              </div>
            </div>
          </div>

          <div style={{ marginTop: '40px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
            <button className="btn btn-primary" type="submit" disabled={loading} style={{ padding: '12px 40px', borderRadius: '100px', fontWeight: 'bold' }}>
              {loading ? 'Saving...' : 'Update Page Content'}
            </button>
          </div>
        </form>
      </div>
      
      <p style={{ marginTop: '20px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', textAlign: 'center', maxWidth: '600px', margin: '20px auto' }}>
        Administrators can update the high-level metadata and visual storytelling assets of dedicated landing pages through this panel.
      </p>
    </div>
  );

  function renderUsers() {
    return (
      <div className="animate-fade-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3>Active Platform Users</h3>
          <button className="btn btn-outline" onClick={() => {fetchData(); fetchCounts();}} style={{ padding: '6px 15px', fontSize: '0.8rem' }}>
            Refresh List
          </button>
        </div>
        <div style={{ display: 'grid', gap: '15px', marginTop: '20px' }}>
          {registeredUsers.length > 0 ? registeredUsers.map(u => (
            <div key={u._id} className="glass-premium" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ margin: 0 }}>{u.name}</h4>
                <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>{u.email} | <span style={{color: 'var(--primary)', fontWeight: 'bold'}}>{u.role?.toUpperCase() || 'USER'}</span></p>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '8px' }}>
                  <span className={`badge ${u.membershipLevel && u.membershipLevel !== 'None' ? 'bg-success' : 'bg-secondary'}`} style={{fontSize: '0.7rem'}}>
                    {u.membershipLevel || 'None'}
                  </span>
                  {u.isApproved && <span className="badge bg-primary" style={{fontSize: '0.7rem'}}>APPROVED</span>}
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Joined: {new Date(u.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                 <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Ref Code</div>
                 <div style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{u.referralCode || 'N/A'}</div>
              </div>
            </div>
          )) : <p>No users found.</p>}
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    if (showForm) return renderPropertyForm();
    switch (activeTab) {
      case 'analytics': return renderAnalytics();
      case 'projects': return renderProjectList();
      case 'inquiries': return renderInquiries();
      case 'payments': return renderPayments();
      case 'visits': return renderVisits();
      case 'alerts': return renderAlerts();
      case 'partners': return renderPartnerLeads();
      case 'brokers': return renderBrokerLeads();
      case 'newsletter': return renderNewsletter();
      case 'users': return renderUsers();
      case 'broadcast': return renderBroadcast();
      case 'pages': return renderPageEditor();
      default: return renderAnalytics();
    }
  };

  const handlePartnerStatus = async (id, status) => {
    try {
      const resp = await fetch(`/api/partner-leads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (resp.ok) {
        showToast(`Lead marked as ${status}`);
        fetchData();
        fetchCounts();
      }
    } catch (err) { console.error(err); }
  };

  const renderPartnerLeads = () => (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3>Associate Partner Leads</h3>
        <button className="btn btn-outline" onClick={() => {fetchData(); fetchCounts();}} style={{ padding: '6px 15px', fontSize: '0.8rem' }}>
          Refresh List
        </button>
      </div>
      <div style={{ display: 'grid', gap: '15px' }}>
        {partnerLeads.length > 0 ? partnerLeads.map(lead => (
          <div key={lead._id} className="glass-premium" style={{ padding: '25px', position: 'relative' }}>
             {/* Priority Indicator */}
             <div style={{ 
               position: 'absolute', 
               top: 0, left: 0, width: '4px', height: '100%', 
               background: lead.priority === 'Urgent' ? '#ef4444' : lead.priority === 'High' ? '#f59e0b' : lead.priority === 'Medium' ? '#3b82f6' : '#6b7280',
               borderRadius: '4px 0 0 4px'
             }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <h4 style={{ margin: 0, fontSize: '1.2rem' }}>{lead.name}</h4>
                  <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', color: 'var(--primary)', fontWeight: 'bold' }}>
                    SOURCE: {lead.source || 'WEBSITE'}
                  </span>
                </div>
                <p style={{ margin: '5px 0', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>{lead.phone} | City: <strong>{lead.city}</strong></p>
                
                <div style={{ display: 'flex', gap: '15px', marginTop: '15px', flexWrap: 'wrap' }}>
                  <div className="crm-field">
                    <label style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', display: 'block' }}>Status</label>
                    <select 
                      value={lead.status} 
                      onChange={(e) => handleCRMUpdate('partner', lead._id, { status: e.target.value })}
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 'bold', padding: '4px 8px', borderRadius: '6px', colorScheme: 'dark' }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Onboarded">Onboarded</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                  <div className="crm-field">
                    <label style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', display: 'block' }}>Priority</label>
                    <select 
                      value={lead.priority || 'Medium'} 
                      onChange={(e) => handleCRMUpdate('partner', lead._id, { priority: e.target.value })}
                      style={{ background: lead.priority === 'Urgent' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: lead.priority === 'Urgent' ? '#ef4444' : '#fff', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 'bold', padding: '4px 8px', borderRadius: '6px', colorScheme: 'dark' }}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>Received: {new Date(lead.createdAt).toLocaleDateString()}</p>
                <div style={{ marginTop: '15px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <button 
                    className="btn btn-outline" 
                    style={{ padding: '6px 15px', fontSize: '0.8rem' }}
                    onClick={() => {
                      const note = prompt('Enter interaction details:');
                      if (note) addNote('partner', lead._id, note);
                    }}
                  >
                    Add Note
                  </button>
                </div>
              </div>
            </div>

            {/* Notes Section */}
            {lead.notes && lead.notes.length > 0 && (
              <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                <p style={{ margin: '0 0 10px 0', fontSize: '0.75rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '1px' }}>INTERACTION HISTORY</p>
                {lead.notes.map((n, idx) => (
                  <div key={idx} style={{ marginBottom: '8px', paddingBottom: '8px', borderBottom: idx === lead.notes.length -1 ? 'none' : '1px solid rgba(255,255,255,0.05)' }}>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#fff' }}>{n.content}</p>
                    <p style={{ margin: '3px 0 0 0', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>By {n.author} • {new Date(n.createdAt).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )) : <p>No partner leads found.</p>}
      </div>
    </div>
  );

  const handleBrokerStatus = async (id, status) => {
    try {
      const resp = await fetch(`/api/broker-leads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (resp.ok) {
        showToast(`Broker marked as ${status}`);
        fetchData();
        fetchCounts();
      }
    } catch (err) { console.error(err); }
  };

  const renderBrokerLeads = () => (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3>Broker Network Signups</h3>
        <button className="btn btn-outline" onClick={() => {fetchData(); fetchCounts();}} style={{ padding: '6px 15px', fontSize: '0.8rem' }}>
          Refresh List
        </button>
      </div>
      <div style={{ display: 'grid', gap: '15px' }}>
        {brokerLeads.length > 0 ? brokerLeads.map(lead => (
          <div key={lead._id} className="glass-premium" style={{ padding: '25px', position: 'relative' }}>
             {/* Priority Indicator */}
             <div style={{ 
               position: 'absolute', 
               top: 0, left: 0, width: '4px', height: '100%', 
               background: lead.priority === 'Urgent' ? '#ef4444' : lead.priority === 'High' ? '#f59e0b' : lead.priority === 'Medium' ? '#3b82f6' : '#6b7280',
               borderRadius: '4px 0 0 4px'
             }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h4 style={{ margin: 0, color: 'var(--primary)', fontSize: '1.2rem' }}>{lead.email}</h4>
                <p style={{ margin: '5px 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Registered: {new Date(lead.createdAt).toLocaleDateString()}</p>
                
                <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
                  <div className="crm-field">
                    <label style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', display: 'block' }}>Status</label>
                    <select 
                      value={lead.status} 
                      onChange={(e) => handleCRMUpdate('broker', lead._id, { status: e.target.value })}
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 'bold', padding: '4px 8px', borderRadius: '6px', colorScheme: 'dark' }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Onboarded">Onboarded</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                  <div className="crm-field">
                    <label style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', display: 'block' }}>Priority</label>
                    <select 
                      value={lead.priority || 'Medium'} 
                      onChange={(e) => handleCRMUpdate('broker', lead._id, { priority: e.target.value })}
                      style={{ background: lead.priority === 'Urgent' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: lead.priority === 'Urgent' ? '#ef4444' : '#fff', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 'bold', padding: '4px 8px', borderRadius: '6px', colorScheme: 'dark' }}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div style={{ textAlign: 'right' }}>
                <button 
                  className="btn btn-primary" 
                  style={{ padding: '8px 20px', borderRadius: '100px', fontSize: '0.8rem' }}
                  onClick={() => {
                    const note = prompt('Enter broker notes:');
                    if (note) addNote('broker', lead._id, note);
                  }}
                >
                  Log Activity
                </button>
              </div>
            </div>

            {/* Interaction Timeline */}
            {lead.notes && lead.notes.length > 0 && (
              <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                <p style={{ margin: '0 0 10px 0', fontSize: '0.7rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '1px' }}>ACTIVITY LOG</p>
                {lead.notes.map((n, idx) => (
                  <div key={idx} style={{ marginBottom: '8px', paddingBottom: '8px', borderBottom: idx === lead.notes.length -1 ? 'none' : '1px solid rgba(255,255,255,0.05)' }}>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#fff' }}>{n.content}</p>
                    <p style={{ margin: '3px 0 0 0', fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)' }}>By {n.author} • {new Date(n.createdAt).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )) : <p>No broker signups found.</p>}
      </div>
    </div>
  );

  const renderPropertyForm = () => (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h3>{isEditing ? 'Edit Property' : 'Add New Property'}</h3>
        <button className="btn btn-outline" onClick={resetForm}>Back to List</button>
      </div>

      <form onSubmit={handleSubmit} className="glass" style={{ padding: '40px', borderRadius: '24px', border: '1px solid rgba(195, 157, 99, 0.15)' }}>
        {/* Main Info Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr', gap: '25px', marginBottom: '25px' }}>
          <div className="input-group">
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary)', letterSpacing: '1px' }}>PROPERTY TITLE</label>
            <input type="text" className="form-control-luxe" placeholder="e.g. Skyline Luxury Suites" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
          </div>
          <div className="input-group">
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary)', letterSpacing: '1px' }}>LOCATION</label>
            <input type="text" className="form-control-luxe" placeholder="e.g. Marine Drive" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} required />
          </div>
          <div className="input-group">
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary)', letterSpacing: '1px' }}>PRICE (₹)</label>
            <input type="number" className="form-control-luxe" placeholder="Value" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '25px' }}>
          <div className="input-group">
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary)', letterSpacing: '1px' }}>LATITUDE (Optional)</label>
            <input type="number" step="any" className="form-control-luxe" placeholder="e.g. 22.7196" value={formData.lat} onChange={e => setFormData({...formData, lat: e.target.value})} />
          </div>
          <div className="input-group">
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary)', letterSpacing: '1px' }}>LONGITUDE (Optional)</label>
            <input type="number" step="any" className="form-control-luxe" placeholder="e.g. 75.8577" value={formData.lng} onChange={e => setFormData({...formData, lng: e.target.value})} />
          </div>
        </div>

        {/* Secondary Info Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px', marginBottom: '30px' }}>
          <div className="input-group">
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary)', letterSpacing: '1px' }}>PROPERTY TYPE</label>
            <select className="form-control-luxe" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
              <option>Flat</option>
              <option>Residential</option>
              <option>Villa</option>
              <option>Coastal</option>
              <option>Plot</option>
              <option>Commercial</option>
              <option>Co-Working</option>
            </select>
          </div>
          <div className="input-group">
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary)', letterSpacing: '1px' }}>CITY</label>
            <select className="form-control-luxe" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})}>
              <option>Mumbai</option>
              <option>Pune</option>
              <option>Delhi</option>
              <option>Gurgaon</option>
              <option>Indore</option>
            </select>
          </div>
          <div className="input-group">
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary)', letterSpacing: '1px' }}>STATUS</label>
            <select className="form-control-luxe" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
              <option>Available</option>
              <option>Sold</option>
              <option>Upcoming</option>
            </select>
          </div>
        </div>

        {/* Featured Toggle */}
        <div style={{ 
          background: 'rgba(195, 157, 99, 0.05)', 
          padding: '15px 25px', 
          borderRadius: '15px', 
          border: '1px solid rgba(195, 157, 99, 0.1)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '15px',
          marginBottom: '30px',
          cursor: 'pointer'
        }} onClick={() => setFormData({...formData, isFeatured: !formData.isFeatured})}>
          <div style={{ 
            width: '24px', 
            height: '24px', 
            borderRadius: '6px', 
            border: '2px solid var(--primary)', 
            background: formData.isFeatured ? 'var(--primary)' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s'
          }}>
            {formData.isFeatured && <CheckCircle size={16} color="#000" />}
          </div>
          <label style={{ cursor: 'pointer', fontWeight: '700', fontSize: '0.9rem', color: formData.isFeatured ? 'var(--primary)' : '#fff', margin: 0 }}>
            Featured (Display in Top 15 Masterpieces)
          </label>
        </div>

        {/* Notify Toggle */}
        <div style={{ 
          background: 'rgba(59, 130, 246, 0.05)', 
          padding: '15px 25px', 
          borderRadius: '15px', 
          border: '1px solid rgba(59, 130, 246, 0.1)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '15px',
          marginBottom: '30px',
          marginLeft: '20px',
          cursor: 'pointer'
        }} onClick={() => setFormData({...formData, notifyUsers: !formData.notifyUsers})}>
          <div style={{ 
            width: '24px', 
            height: '24px', 
            borderRadius: '6px', 
            border: '2px solid #3b82f6', 
            background: formData.notifyUsers ? '#3b82f6' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s'
          }}>
            {formData.notifyUsers && <CheckCircle size={16} color="#fff" />}
          </div>
          <label style={{ cursor: 'pointer', fontWeight: '700', fontSize: '0.9rem', color: formData.notifyUsers ? '#3b82f6' : '#fff', margin: 0 }}>
            Notify All Users via Email
          </label>
        </div>

        <div className="input-group" style={{ marginTop: '20px' }}>
          <label>Description</label>
          <textarea className="form-control" rows="4" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required></textarea>
        </div>

        <div className="input-group" style={{ marginTop: '20px' }}>
          <label style={{ marginBottom: '10px', display: 'block' }}>Amenities</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {predefinedAmenities.map(amenity => (
              <div 
                key={amenity}
                className={`badge ${formData.amenities.includes(amenity) ? 'btn-active-glow' : ''}`}
                style={{ cursor: 'pointer', padding: '8px 12px' }}
                onClick={() => handleAmenityToggle(amenity)}
              >
                {amenity}
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div>
            <label style={{ marginBottom: '10px', display: 'block' }}>Property Images (Up to 5)</label>
            <input type="file" multiple accept="image/*" onChange={handleImageChange} className="form-control" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '10px', marginTop: '15px' }}>
              {imagePreviews.map((src, index) => (
                <div key={index} style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', height: '80px', border: '1px solid var(--border)' }}>
                  <img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Preview" />
                  <button type="button" onClick={() => removeImage(index)} style={{ position: 'absolute', top: '2px', right: '2px', background: 'var(--danger)', color: '#fff', border: 'none', borderRadius: '50%', width: '18px', height: '18px', cursor: 'pointer', fontSize: '12px' }}>&times;</button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label style={{ marginBottom: '10px', display: 'block' }}>Property Brochure (PDF)</label>
            <input type="file" accept=".pdf" onChange={(e) => setBrochure(e.target.files[0])} className="form-control" />
            {brochure && (
              <div style={{ marginTop: '15px', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                <CheckCircle size={16} /> Selected: {brochure.name}
              </div>
            )}
            {isEditing && editingProject?.brochureUrl && !brochure && (
              <div style={{ marginTop: '15px', color: 'var(--primary)', fontSize: '0.9rem' }}>
                Existing brochure available
              </div>
            )}
          </div>
        </div>

        <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ flex: 1 }}>
            {loading ? 'Processing...' : isEditing ? 'Update Property' : 'Publish Property'}
          </button>
          <button type="button" className="btn btn-outline" onClick={resetForm} style={{ flex: 1 }}>Cancel</button>
        </div>
      </form>
    </div>
  );  const renderProjectList = () => (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '35px' }}>
        {/* Row 1: Title & Action Group */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '25px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.8rem' }}>Project Listings</h3>
            <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: 'var(--primary)', fontWeight: '600', opacity: 0.8 }}>
              {projects.filter(p => p.isFeatured && p.type?.toLowerCase() !== 'coastal').length} of 15 Featured slots used (Excl. Coastal)
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'flex-end' }}>
              <div className="glass" style={{ 
                height: '45px', 
                padding: '0 15px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                fontSize: '0.8rem', 
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.08)'
              }}>
                <UploadCloud size={16} color="var(--primary)" />
                <input type="file" accept=".csv" onChange={(e) => setCsvFile(e.target.files[0])} style={{ display: 'none' }} id="bulk-csv" />
                <label htmlFor="bulk-csv" style={{ cursor: 'pointer', fontWeight: 600 }}>{csvFile ? csvFile.name : 'Bulk CSV'}</label>
                {csvFile && <button className="btn btn-primary" style={{ padding: '4px 10px', fontSize: '0.7rem' }} onClick={handleBulkUpload} disabled={loading}>Import</button>}
              </div>
              <button 
                onClick={downloadCsvTemplate} 
                style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '0.7rem', cursor: 'pointer', textDecoration: 'underline', padding: '0 5px' }}
              >
                Template
              </button>
            </div>
            <button className="btn btn-primary btn-animated" onClick={() => setShowForm(true)} style={{ height: '45px', display: 'flex', alignItems: 'center', gap: '8px', borderRadius: '10px', fontWeight: 700 }}>
              <Plus size={18} /> Add Property
            </button>
          </div>
        </div>

        {/* Row 2: Full Width Search */}
        <div style={{ position: 'relative' }}>
          <Building2 size={18} style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', opacity: 0.6, color: 'var(--primary)' }} />
          <input 
            type="text" 
            placeholder="Search property by name, location, or status..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
            style={{ 
              width: '100%',
              padding: '16px 20px 16px 50px', 
              borderRadius: '12px', 
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(195, 157, 99, 0.2)',
              color: '#fff'
            }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gap: '15px' }}>
        {filteredProjects.length > 0 ? filteredProjects.map(project => (
          <div key={project._id} className="glass" style={{ padding: '15px', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <img 
              src={project.images?.[0] || `https://images.unsplash.com/photo-${['1560518883-ce09059eeffa', '1512917774080-9991f1c4c750', '1600585154340-be6161a56a0c', '1600607687940-c52af04657b3', '1545324418-cc1a3fa10c00'][project.title.length % 5]}?q=80&w=2073`} 
              style={{ width: '60px', height: '60px', borderRadius: '6px', objectFit: 'cover' }} 
              alt={project.title}
            />
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: 0, fontSize: '1rem' }}>{project.title}</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: '4px 0' }}>
                {project.location} • ₹{formatIndianPrice(project.price)}
              </p>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span className="badge" style={{ margin: 0, opacity: 0.8 }}>{project.status || 'Available'}</span>
                
                {/* UPDATED TOGGLE OPTION */}
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleFeatured(project._id, project.isFeatured); }}
                  style={{
                    background: project.isFeatured ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid ${project.isFeatured ? '#ef4444' : 'rgba(255, 255, 255, 0.1)'}`,
                    color: project.isFeatured ? '#ef4444' : 'rgba(255, 255, 255, 0.5)',
                    padding: '4px 12px',
                    borderRadius: '100px',
                    fontSize: '0.65rem',
                    fontWeight: '800',
                    cursor: 'pointer',
                    letterSpacing: '1px',
                    transition: 'all 0.3s'
                  }}
                >
                  {project.isFeatured ? '✕ REMOVE FROM TOP 15' : '☆ ADD TO TOP 15'}
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn btn-outline" style={{ padding: '6px' }} onClick={() => handleEdit(project)}><Edit3 size={16} /></button>
              <button className="btn btn-outline" style={{ padding: '6px', color: 'var(--danger)', borderColor: 'var(--danger)' }} onClick={() => handleDelete(project._id)}><Trash2 size={16} /></button>
            </div>
          </div>
        )) : <p>No projects found.</p>}
      </div>
    </div>
  );

  const renderAnalytics = () => {
    // Calculate Dynamic Metrics
    const totalAssetValueRaw = projects.reduce((sum, p) => sum + (Number(p.price) || 0), 0);
    const assetValueInCr = (totalAssetValueRaw / 10000000).toFixed(1);
    
    const totalPaymentsCount = payments.length;
    const totalInquiriesCount = inquiries.length;
    const conversionRatePercent = totalInquiriesCount > 0 ? ((totalPaymentsCount / totalInquiriesCount) * 100).toFixed(1) : "3.8";

    const roiData = [
      { name: 'Coastal Luxury', roi: 14.2, growth: 8.5 },
      { name: 'Commercial', roi: 11.8, growth: 6.2 },
      { name: 'Residential', roi: 9.4, growth: 4.8 },
      { name: 'Plots', roi: 12.6, growth: 10.1 },
      { name: 'Co-Working', roi: 10.5, growth: 5.5 }
    ];

    const typeCounts = projects.reduce((acc, p) => {
      acc[p.type] = (acc[p.type] || 0) + 1;
      return acc;
    }, {});
    const distData = Object.keys(typeCounts).map(name => ({ name, value: typeCounts[name] }));
    const COLORS = ['#c39d63', '#4f46e5', '#10b981', '#f59e0b', '#ec4899'];

    const renderMetricDetails = () => {
      switch(selectedMetric) {
        case 'roi':
          return (
            <div className="glass animate-fade-in" style={{ padding: '25px', height: '400px' }}>
              <h4 style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}><TrendingUp size={18} color="#c39d63" /> ROI Deep Dive by Category (%)</h4>
              <ResponsiveContainer width="100%" height="85%">
                <BarChart data={roiData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" fontSize={12} />
                  <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ background: '#1a1d24', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="roi" fill="#c39d63" radius={[4, 4, 0, 0]} name="Projected ROI (%)" />
                  <Bar dataKey="growth" fill="#4f46e5" radius={[4, 4, 0, 0]} name="Annual Growth (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          );
        case 'asset':
          // Dynamic city distribution data from project states
          const cityStats = projects.reduce((acc, p) => {
             const city = p.city || 'Other';
             acc[city] = (acc[city] || 0) + (Number(p.price) || 0);
             return acc;
          }, {});
          
          const cityAssetData = Object.keys(cityStats).map(city => ({
            name: city,
            value: Number((cityStats[city] / 10000000).toFixed(1))
          })).sort((a,b) => b.value - a.value);

          return (
            <div className="glass animate-fade-in" style={{ padding: '25px', height: '400px' }}>
              <h4 style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}><Building2 size={18} color="#4f46e5" /> Asset Value Distribution (₹ Cr)</h4>
              <ResponsiveContainer width="100%" height="85%">
                <AreaChart data={cityAssetData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip contentStyle={{ background: '#1a1d24' }} />
                  <Area type="monotone" dataKey="value" stroke="#4f46e5" fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          );
        case 'conversion':
          const conversionPath = [
            { name: 'Leads', value: inquiries.length },
            { name: 'Visits', value: visits.length },
            { name: 'Partner Refs', value: partnerLeads.length },
            { name: 'Confirmed', value: payments.length }
          ];
          return (
            <div className="glass animate-fade-in" style={{ padding: '25px', height: '400px' }}>
              <h4 style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}><Users size={18} color="#10b981" /> Sales Conversion Funnel</h4>
              <ResponsiveContainer width="100%" height="85%">
                <BarChart layout="vertical" data={conversionPath}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" stroke="#fff" fontSize={12} width={100} />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="value" fill="#10b981" radius={[0, 5, 5, 0]} label={{ position: 'right', fill: '#fff' }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          );
        default: return null;
      }
    };

    return (
      <div className="animate-fade-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h3>Investment & ROI Analytics</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div className="badge bg-success">MARKET: BULLISH</div>
            <div className="badge" style={{ background: 'var(--primary)' }}>AVG ROI: 11.7%</div>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div 
            className={`glass analytic-button ${selectedMetric === 'roi' ? 'active' : ''}`} 
            onClick={() => setSelectedMetric('roi')}
            style={{ padding: '20px', borderLeft: '4px solid #c39d63', cursor: 'pointer', transition: 'all 0.3s' }}
          >
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Top Category ROI</p>
            <h2 style={{ margin: '10px 0 0 0', color: '#c39d63' }}>{roiData[0].roi}%</h2>
            <p style={{ margin: '5px 0 0 0', fontSize: '0.75rem', color: 'var(--success)' }}><TrendingUp size={12} /> Click for detail</p>
          </div>
          <div 
            className={`glass analytic-button ${selectedMetric === 'asset' ? 'active' : ''}`} 
            onClick={() => setSelectedMetric('asset')}
            style={{ padding: '20px', borderLeft: '4px solid #4f46e5', cursor: 'pointer', transition: 'all 0.3s' }}
          >
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Asset Value</p>
            <h2 style={{ margin: '10px 0 0 0' }}>₹{assetValueInCr} Cr</h2>
            <p style={{ margin: '5px 0 0 0', fontSize: '0.75rem', color: 'var(--success)' }}><TrendingUp size={12} /> Click for detail</p>
          </div>
          <div 
            className={`glass analytic-button ${selectedMetric === 'conversion' ? 'active' : ''}`} 
            onClick={() => setSelectedMetric('conversion')}
            style={{ padding: '20px', borderLeft: '4px solid #10b981', cursor: 'pointer', transition: 'all 0.3s' }}
          >
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Conversion Rate</p>
            <h2 style={{ margin: '10px 0 0 0' }}>{conversionRatePercent}%</h2>
            <p style={{ margin: '5px 0 0 0', fontSize: '0.75rem', color: 'var(--success)' }}><TrendingUp size={12} /> Click for detail</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
          {/* Dynamic Detail Chart (The one the user clicked) */}
          <div style={{ gridColumn: 'span 1' }}>
            {renderMetricDetails()}
          </div>

          {/* Distribution Chart (Static or also dynamic) */}
          <div className="glass" style={{ padding: '25px', height: '400px' }}>
            <h4 style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}><PieIcon size={18} color="#4f46e5" /> Portfolio Distribution</h4>
            <ResponsiveContainer width="100%" height="85%">
              <PieChart>
                <Pie
                  data={distData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {distData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ background: '#1a1d24', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px' }}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ROI Table Summary */}
        <div className="glass" style={{ marginTop: '30px', padding: '25px' }}>
          <h4 style={{ marginBottom: '20px' }}>ROI Performance Breakdown</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <th style={{ padding: '12px' }}>Category</th>
                <th style={{ padding: '12px' }}>Avg Price</th>
                <th style={{ padding: '12px' }}>Projected ROI</th>
                <th style={{ padding: '12px' }}>Market Sentiment</th>
              </tr>
            </thead>
            <tbody>
              {roiData.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>{item.name}</td>
                  <td style={{ padding: '12px' }}>₹ {formatIndianPrice(Math.floor(Math.random() * 50000000) + 10000000)}</td>
                  <td style={{ padding: '12px', color: '#10b981', fontWeight: 'bold' }}>{item.roi}%</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ 
                      padding: '4px 10px', 
                      borderRadius: '100px', 
                      fontSize: '0.7rem', 
                      background: item.roi > 11 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(195, 157, 99, 0.1)',
                      color: item.roi > 11 ? '#10b981' : '#c39d63',
                      border: `1px solid ${item.roi > 11 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(195, 157, 99, 0.2)'}`
                    }}>
                      {item.roi > 11 ? 'HIGH GROWTH' : 'STABLE'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Stock Market Performance Tracker */}
        <div className="glass" style={{ marginTop: '30px', padding: '25px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
            <div>
              <h4 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <TrendingUp size={20} color="var(--primary)" /> 
                Basera Associates Stock Performance (NSE: BASERA)
              </h4>
              <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Real-time market analytics and investor sentiment</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#fff' }}>₹4,102.50</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--success)', fontWeight: 'bold' }}>+₹214.20 (5.21%) ↑</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '30px', alignItems: 'center' }}>
            {/* Stock Metadata */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div className="stock-info-card" style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Market Cap Rank</div>
                <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--primary)' }}>#12 In Real Estate</div>
              </div>
              <div className="stock-info-card" style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>P/E Ratio</div>
                <div style={{ fontSize: '1.2rem', fontWeight: '700' }}>24.8</div>
              </div>
              <div className="stock-info-card" style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>52W High</div>
                <div style={{ fontSize: '1.2rem', fontWeight: '700' }}>₹4,250.00</div>
              </div>
            </div>

            {/* Growth Graph */}
            <div style={{ height: '250px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[
                  { month: 'May 23', price: 2800 },
                  { month: 'Jul 23', price: 3100 },
                  { month: 'Sep 23', price: 2950 },
                  { month: 'Nov 23', price: 3400 },
                  { month: 'Jan 24', price: 3800 },
                  { month: 'Mar 24', price: 3750 },
                  { month: 'Apr 24', price: 4102 }
                ]}>
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ background: '#1a1d24', border: '1px solid var(--primary)', borderRadius: '8px' }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="var(--primary)" 
                    strokeWidth={3} 
                    dot={{ fill: 'var(--primary)', r: 4 }} 
                    activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
                    animationDuration={2500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <style>{`
          .analytic-button:hover {
            transform: translateY(-5px);
            background: rgba(255,255,255,0.08);
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
          }
          .analytic-button.active {
            background: rgba(195, 157, 99, 0.05);
            border-bottom: 2px solid var(--primary) !important;
          }
          .stock-info-card {
            transition: all 0.3s;
          }
          .stock-info-card:hover {
            background: rgba(195, 157, 99, 0.05) !important;
            border-color: rgba(195, 157, 99, 0.2) !important;
          }
        `}</style>
      </div>
    );
  };

  const renderInquiries = () => (
    <div className="animate-fade-in">
      <h3>Customer Inquiries</h3>
      <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
        {inquiries.length > 0 ? inquiries.map(inq => (
          <div key={inq._id} className="glass-premium" style={{ padding: '25px', position: 'relative' }}>
             {/* Priority Indicator */}
             <div style={{ 
               position: 'absolute', 
               top: 0, left: 0, width: '4px', height: '100%', 
               background: inq.priority === 'Urgent' ? '#ef4444' : inq.priority === 'High' ? '#f59e0b' : inq.priority === 'Medium' ? '#3b82f6' : '#6b7280',
               borderRadius: '4px 0 0 4px'
             }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                  <h4 style={{ margin: 0, fontSize: '1.25rem' }}>{inq.name}</h4>
                  <span style={{ fontSize: '0.65rem', padding: '3px 10px', borderRadius: '100px', background: 'rgba(195,157,99,0.1)', color: 'var(--primary)', fontWeight: '900', letterSpacing: '1px' }}>
                    {inq.source?.toUpperCase() || 'WEBSITE'}
                  </span>
                </div>
                
                <p style={{ margin: '0 0 15px 0', fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)' }}>
                  {inq.email} | Interested in: <strong style={{ color: 'var(--primary)' }}>{inq.projectId?.title || 'General Property'}</strong>
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '20px', marginTop: '10px' }}>
                  <div>
                    <label style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Offer Price</label>
                    <p style={{ margin: 0, color: 'var(--success)', fontWeight: 'bold', fontSize: '1.2rem' }}>₹{formatIndianPrice(inq.offerPrice)}</p>
                  </div>
                  
                  <div>
                    <label style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Lead Status</label>
                    <select 
                      value={inq.status || 'Pending'} 
                      onChange={(e) => handleCRMUpdate('inquiry', inq._id, { status: e.target.value })}
                      style={{ display: 'block', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 'bold', padding: '4px 8px', borderRadius: '6px', marginTop: '5px', colorScheme: 'dark' }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Negotiating">Negotiating</option>
                      <option value="Converted">Converted</option>
                      <option value="Lost">Lost</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Priority</label>
                    <select 
                      value={inq.priority || 'Medium'} 
                      onChange={(e) => handleCRMUpdate('inquiry', inq._id, { priority: e.target.value })}
                      style={{ display: 'block', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: inq.priority === 'Urgent' ? '#ef4444' : '#fff', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 'bold', padding: '4px 8px', borderRadius: '6px', marginTop: '5px', colorScheme: 'dark' }}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '0.8rem', opacity: 0.5 }}>{new Date(inq.createdAt).toLocaleString()}</p>
                <button 
                  className="btn btn-primary" 
                  style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '100px', fontSize: '0.85rem' }}
                  onClick={() => {
                    const note = prompt('Enter follow-up details:');
                    if (note) addNote('inquiry', inq._id, note);
                  }}
                >
                  Log Interaction
                </button>
              </div>
            </div>

            {/* Interaction Timeline */}
            {inq.notes && inq.notes.length > 0 && (
              <div style={{ marginTop: '25px', padding: '20px', background: 'rgba(0,0,0,0.2)', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.03)' }}>
                <h5 style={{ margin: '0 0 15px 0', fontSize: '0.7rem', fontWeight: '900', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '2px' }}>
                  <TrendingUp size={12} style={{marginRight: '8px'}}/> Interaction Timeline
                </h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {inq.notes.map((note, i) => (
                    <div key={i} style={{ paddingLeft: '15px', borderLeft: '1px solid rgba(195,157,99,0.3)', position: 'relative' }}>
                      <div style={{ position: 'absolute', left: '-4.5px', top: '5px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }} />
                      <p style={{ margin: 0, fontSize: '0.9rem', color: '#e0e0e0', lineHeight: '1.4' }}>{note.content}</p>
                      <p style={{ margin: '4px 0 0 0', fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)' }}>{note.author} • {new Date(note.createdAt).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )) : <p>No inquiries found.</p>}
      </div>
    </div>
  );

  const renderPayments = () => (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3>Successful Payments</h3>
        <button className="btn btn-outline" onClick={() => {fetchData(); fetchCounts();}} style={{ padding: '6px 15px', fontSize: '0.8rem' }}>
          Refresh List
        </button>
      </div>
      <div style={{ display: 'grid', gap: '15px' }}>
        {payments.length > 0 ? payments.map(pay => (
          <div key={pay._id} className="glass" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: 0 }}>{pay.userName}</h4>
              <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>{pay.userEmail} | {pay.userPhone}</p>
              <p style={{ margin: '5px 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                {pay.membershipPlan ? 'Membership: ' : 'Project: '}
                <span style={{color: 'var(--primary)'}}>{pay.membershipPlan || pay.projectId?.title || 'General Booking'}</span>
              </p>
              <p style={{ margin: 0, fontSize: '0.86rem', opacity: 0.7 }}>Transaction ID: {pay.razorpayPaymentId}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: 0, fontSize: '1.4rem', color: 'var(--success)', fontWeight: 'bold' }}>₹{formatIndianPrice(pay.amount)}</p>
              <div className="badge bg-success" style={{ margin: '5px 0 0 0' }}>VERIFIED</div>
            </div>
          </div>
        )) : <p>No payments found.</p>}
      </div>
    </div>
  );

  const renderVisits = () => (
    <div className="animate-fade-in">
      <h3>Visit Requests</h3>
      <div style={{ display: 'grid', gap: '15px', marginTop: '20px' }}>
        {visits.length > 0 ? visits.map(visit => (
          <div key={visit._id} className="glass" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: 0 }}>{visit.userName}</h4>
              <p style={{ margin: '5px 0' }}>{visit.date} at {visit.time}</p>
              <p style={{ margin: '5px 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Project: {visit.projectId?.title}</p>
              <span className={`badge ${visit.status === 'Completed' ? 'bg-success' : ''}`}>{visit.status}</span>
            </div>

            {visit.status === 'Pending' && (
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  className="btn btn-primary" 
                  style={{ padding: '8px 15px' }}
                  onClick={() => handleVisitStatus(visit._id, 'Confirmed')}
                >
                  <CheckCircle size={16} style={{ marginRight: '6px' }} /> Approve
                </button>
                <button 
                  className="btn btn-outline" 
                  style={{ color: 'var(--danger)', borderColor: 'var(--danger)', padding: '8px 15px' }}
                  onClick={() => handleVisitStatus(visit._id, 'Cancelled')}
                >
                  <X size={16} style={{ marginRight: '6px' }} /> Reject
                </button>
              </div>
            )}

            {(visit.status === 'Scheduled' || visit.status === 'Confirmed') && (
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  className="btn btn-outline" 
                  style={{ color: 'var(--success)', borderColor: 'var(--success)', padding: '8px 15px' }}
                  onClick={() => handleVisitStatus(visit._id, 'Completed')}
                >
                  <CheckCircle size={16} style={{ marginRight: '6px' }} /> Mark Done
                </button>
                <button 
                  className="btn btn-outline" 
                  style={{ color: 'var(--danger)', borderColor: 'var(--danger)', padding: '8px 15px' }}
                  onClick={() => handleVisitStatus(visit._id, 'Cancelled')}
                >
                  <X size={16} style={{ marginRight: '6px' }} /> Cancel
                </button>
              </div>
            )}
          </div>
        )) : <p>No visit requests found.</p>}
      </div>
    </div>
  );

  const renderAlerts = () => (
    <div className="animate-fade-in">
      <h3>Price Alerts</h3>
      <div style={{ display: 'grid', gap: '15px', marginTop: '20px' }}>
        {alerts.length > 0 ? alerts.map(alert => (
          <div key={alert._id} className="glass" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: 0, color: 'var(--primary)' }}>₹{formatIndianPrice(alert.targetPrice)}</h4>
              <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>User: {alert.userEmail}</p>
              <p style={{ margin: '5px 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Project: {alert.projectId?.title}</p>
            </div>
            <div className="badge bg-warning">ACTIVE</div>
          </div>
        )) : <p>No price alerts found.</p>}
      </div>
    </div>
  );

  const renderNewsletter = () => (
    <div className="animate-fade-in">
      <h3>Newsletter Subscribers</h3>
      <div style={{ display: 'grid', gap: '15px', marginTop: '20px' }}>
        {newsletterSubscribers.length > 0 ? newsletterSubscribers.map(sub => (
          <div key={sub._id} className="glass" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: 0 }}>{sub.email}</h4>
              <p style={{ margin: '5px 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Subscribed: {new Date(sub.subscribedAt).toLocaleDateString()}</p>
            </div>
            <div className="badge bg-success">ACTIVE</div>
          </div>
        )) : <p>No newsletter subscribers found.</p>}
      </div>
    </div>
  );



  const renderBroadcast = () => (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '30px' }}>
        <h3>Mass Broadcast Center</h3>
        <p style={{ color: 'var(--text-muted)' }}>Send high-priority email notifications to all registered users and newsletter subscribers.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px' }}>
        <form onSubmit={handleBroadcast} className="glass" style={{ padding: '30px' }}>
          <div className="input-group">
            <label>Subject</label>
            <input 
              type="text" 
              className="form-control-luxe" 
              placeholder="e.g. Exclusive Launch: Palacia Signature"
              value={broadcastData.subject} 
              onChange={e => setBroadcastData({...broadcastData, subject: e.target.value})}
              required 
            />
          </div>
          <div className="input-group" style={{ marginTop: '20px' }}>
            <label>Broadcast Type</label>
            <select 
              className="form-control-luxe"
              value={broadcastData.type}
              onChange={e => setBroadcastData({...broadcastData, type: e.target.value})}
            >
              <option>Event Launch</option>
              <option>New Property Addition</option>
              <option>Newsletter</option>
              <option>Urgent Update</option>
            </select>
          </div>
          <div className="input-group" style={{ marginTop: '20px' }}>
            <label>Message Content</label>
            <textarea 
              className="form-control-luxe" 
              rows="6" 
              placeholder="Write your announcement here..."
              value={broadcastData.message}
              onChange={e => setBroadcastData({...broadcastData, message: e.target.value})}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '20px', width: '100%', padding: '15px' }} disabled={loading}>
            {loading ? 'Sending Broadcast...' : 'Initiate Mass Broadcast'}
          </button>
        </form>

        <div className="glass" style={{ padding: '30px' }}>
          <h4 style={{ color: 'var(--primary)' }}>Quick Presets</h4>
          <div style={{ display: 'grid', gap: '15px', marginTop: '20px' }}>
            <button 
              className="btn btn-outline" 
              style={{ textAlign: 'left', padding: '15px' }}
              onClick={() => setBroadcastData({
                subject: 'Grand Unveiling: Our New Luxury Project',
                message: 'We are thrilled to announce the launch of our latest architectural masterpiece. Join us for an exclusive walkthrough of elegance and sophistication.',
                type: 'Event Launch'
              })}
            >
              <span style={{ display: 'block', fontWeight: 'bold' }}>Event Launch</span>
              <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Notify about new events.</span>
            </button>
            <button 
              className="btn btn-outline" 
              style={{ textAlign: 'left', padding: '15px' }}
              onClick={() => setBroadcastData({
                subject: 'New Premium Property Added to Collection',
                message: 'A rare opportunity has emerged. A new high-luxury residence has just been listed in our exclusive collection.',
                type: 'New Property Addition'
              })}
            >
              <span style={{ display: 'block', fontWeight: 'bold' }}>Property Listing</span>
              <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Alert users about new listings.</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="admin-dashboard scroll-reveal visible">
      <div style={{ display: 'flex', minHeight: '100vh', gap: '30px', padding: '120px 50px 50px 50px' }}>
        
        {/* Sidebar */}
        <div style={{ flex: '0 0 280px' }}>
          <div className="glass" style={{ padding: '30px', position: 'sticky', top: '120px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
              <div style={{ background: 'var(--primary)', color: '#fff', width: '45px', height: '45px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>
                {user?.name?.[0] || 'A'}
              </div>
              <div>
                <h4 style={{ margin: 0 }}>{user?.name || 'Administrator'}</h4>
                <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.7 }}>{user?.role?.toUpperCase()}</p>
              </div>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li 
                style={{ padding: '12px 15px', cursor: 'pointer', borderRadius: '8px', color: activeTab === 'analytics' ? 'var(--primary)' : 'inherit', background: activeTab === 'analytics' ? 'rgba(195,157,99,0.1)' : 'transparent', marginBottom: '8px' }} 
                onClick={() => setActiveTab('analytics')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <BarChart3 size={18} /> Analytics
                </div>
              </li>
              <li 
                style={{ padding: '12px 15px', cursor: 'pointer', borderRadius: '8px', color: activeTab === 'projects' ? 'var(--primary)' : 'inherit', background: activeTab === 'projects' ? 'rgba(195,157,99,0.1)' : 'transparent', marginBottom: '8px' }} 
                onClick={() => {setActiveTab('projects'); setShowForm(false);}}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Building2 size={18} /> Projects
                </div>
              </li>
              <li 
                style={{ padding: '12px 15px', cursor: 'pointer', borderRadius: '8px', color: activeTab === 'pages' ? 'var(--primary)' : 'inherit', background: activeTab === 'pages' ? 'rgba(195,157,99,0.1)' : 'transparent', marginBottom: '8px' }} 
                onClick={() => setActiveTab('pages')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <LayoutDashboard size={18} /> Page Editor
                </div>
              </li>
              <li 
                style={{ padding: '12px 15px', cursor: 'pointer', borderRadius: '8px', color: activeTab === 'inquiries' ? 'var(--primary)' : 'inherit', background: activeTab === 'inquiries' ? 'rgba(195,157,99,0.1)' : 'transparent', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} 
                onClick={() => setActiveTab('inquiries')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <MessageSquare size={18} /> Inquiries
                </div>
                {counts.inquiries > 0 && <span style={{ background: '#ef4444', color: '#fff', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>{counts.inquiries}</span>}
              </li>
              <li 
                style={{ padding: '12px 15px', cursor: 'pointer', borderRadius: '8px', color: activeTab === 'payments' ? 'var(--primary)' : 'inherit', background: activeTab === 'payments' ? 'rgba(195,157,99,0.1)' : 'transparent', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} 
                onClick={() => setActiveTab('payments')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CreditCard size={18} /> Payments
                </div>
                {counts.payments > 0 && <span style={{ background: 'var(--success)', color: '#fff', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>{counts.payments}</span>}
              </li>
              <li 
                style={{ padding: '12px 15px', cursor: 'pointer', borderRadius: '8px', color: activeTab === 'visits' ? 'var(--primary)' : 'inherit', background: activeTab === 'visits' ? 'rgba(195,157,99,0.1)' : 'transparent', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} 
                onClick={() => setActiveTab('visits')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Calendar size={18} /> Visits
                </div>
                {counts.visits > 0 && <span style={{ background: '#ef4444', color: '#fff', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>{counts.visits}</span>}
              </li>
              <li 
                style={{ padding: '12px 15px', cursor: 'pointer', borderRadius: '8px', color: activeTab === 'alerts' ? 'var(--primary)' : 'inherit', background: activeTab === 'alerts' ? 'rgba(195,157,99,0.1)' : 'transparent', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} 
                onClick={() => setActiveTab('alerts')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Bell size={18} /> Alerts
                </div>
                {counts.alerts > 0 && <span style={{ background: 'var(--primary)', color: '#fff', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>{counts.alerts}</span>}
              </li>
              <li 
                style={{ padding: '12px 15px', cursor: 'pointer', borderRadius: '8px', color: activeTab === 'partners' ? 'var(--primary)' : 'inherit', background: activeTab === 'partners' ? 'rgba(195,157,99,0.1)' : 'transparent', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} 
                onClick={() => setActiveTab('partners')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Handshake size={18} /> Partner Leads
                </div>
                {counts.partnerLeads > 0 && <span style={{ background: '#3b82f6', color: '#fff', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>{counts.partnerLeads}</span>}
              </li>
              <li 
                style={{ padding: '12px 15px', cursor: 'pointer', borderRadius: '8px', color: activeTab === 'brokers' ? 'var(--primary)' : 'inherit', background: activeTab === 'brokers' ? 'rgba(195,157,99,0.1)' : 'transparent', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} 
                onClick={() => setActiveTab('brokers')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Users size={18} /> Broker Signups
                </div>
                {counts.brokerLeads > 0 && <span style={{ background: '#a855f7', color: '#fff', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>{counts.brokerLeads}</span>}
              </li>
              <li 
                style={{ padding: '12px 15px', cursor: 'pointer', borderRadius: '8px', color: activeTab === 'newsletter' ? 'var(--primary)' : 'inherit', background: activeTab === 'newsletter' ? 'rgba(195,157,99,0.1)' : 'transparent', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} 
                onClick={() => setActiveTab('newsletter')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Mail size={18} /> Newsletter
                </div>
                {counts.newsletter > 0 && <span style={{ background: 'var(--primary)', color: '#fff', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>{counts.newsletter}</span>}
              </li>
              <li 
                style={{ padding: '12px 15px', cursor: 'pointer', borderRadius: '8px', color: activeTab === 'users' ? 'var(--primary)' : 'inherit', background: activeTab === 'users' ? 'rgba(195,157,99,0.1)' : 'transparent', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} 
                onClick={() => setActiveTab('users')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Users size={18} /> Active Users
                </div>
                {counts.users > 0 && <span style={{ background: '#3498db', color: '#fff', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>{counts.users}</span>}
              </li>
              <li 
                style={{ padding: '12px 15px', cursor: 'pointer', borderRadius: '8px', color: activeTab === 'broadcast' ? 'var(--primary)' : 'inherit', background: activeTab === 'broadcast' ? 'rgba(195,157,99,0.1)' : 'transparent', marginBottom: '8px' }} 
                onClick={() => setActiveTab('broadcast')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <TrendingUp size={18} /> Broadcast
                </div>
              </li>
              
              <li 
                style={{ padding: '12px 15px', cursor: 'pointer', borderRadius: '8px', color: 'var(--danger)', marginTop: '40px' }} 
                onClick={handleLogout}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <LogOut size={18} /> Logout
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Content Plate */}
        <div className="glass" style={{ flex: '3 1 500px', padding: '30px', minHeight: '600px', overflowX: 'hidden' }}>
          {renderTabContent()}
        </div>
      </div>
      
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default AdminDashboard;

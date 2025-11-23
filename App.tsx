import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { StorageService } from './services/storageService';
import { User, UserRole, Scheme } from './types';
import { Button } from './components/Button';
import { Input, TextArea } from './components/Input';
import { SchemeCard } from './components/SchemeCard';
import { ChatInterface } from './components/ChatInterface';
import { SearchBar } from './components/SearchBar';
import { LandingPage } from './components/LandingPage';
import { UserIcon, LockIcon, ShieldCheckIcon } from './components/Icons';
import { TabButton } from './components/TabButton';
import { IconButton } from './components/IconButton';

const LoginPage: React.FC<{ onLogin: (user: User) => void }> = ({ onLogin }) => {
  const [role, setRole] = useState<UserRole>(UserRole.FARMER);
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulate network delay for effect
      await new Promise(resolve => setTimeout(resolve, 800));

      let user: User;
      if (isRegistering && role === UserRole.FARMER) {
        user = StorageService.register(formData.username, formData.password);
      } else {
        user = StorageService.login(formData.username, formData.password, role);
      }
      onLogin(user);
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-[#F9F1F0] animate-fadeIn">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border-t-4 border-[#E6694C] transform transition-all">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FADCD9] rounded-full text-[#E6694C] mb-4">
            {role === UserRole.ADMIN ? <ShieldCheckIcon /> : <UserIcon />}
          </div>
          <h2 className="text-3xl font-bold text-[#333333]">
            {isRegistering ? 'Farmer Registration' : (role === UserRole.ADMIN ? 'Admin Portal' : 'Farmer Login')}
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            {isRegistering ? 'Join Raitha Mitra today!' : 'Welcome back to your dashboard'}
          </p>
        </div>
        
        {!isRegistering && (
          <div className="flex justify-center mb-8 bg-[#F9F1F0] p-1.5 rounded-xl">
            <button
              onClick={() => { setRole(UserRole.FARMER); setError(''); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${role === UserRole.FARMER ? 'bg-white shadow text-[#E6694C]' : 'text-gray-500 hover:text-[#E6694C]'}`}
            >
              Farmer
            </button>
            <button
              onClick={() => { setRole(UserRole.ADMIN); setError(''); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${role === UserRole.ADMIN ? 'bg-white shadow text-[#E6694C]' : 'text-gray-500 hover:text-[#E6694C]'}`}
            >
              Admin
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <span className="absolute left-3 top-9 text-gray-400">
              <UserIcon />
            </span>
            <Input 
              label="Username" 
              value={formData.username} 
              onChange={e => setFormData({...formData, username: e.target.value})} 
              placeholder="Enter your username"
              className="!pl-10"
              required
            />
          </div>
          
          <div className="relative">
            <span className="absolute left-3 top-9 text-gray-400">
              <LockIcon />
            </span>
            <Input 
              label="Password" 
              type="password"
              value={formData.password} 
              onChange={e => setFormData({...formData, password: e.target.value})} 
              placeholder="Enter your password"
              className="!pl-10"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
              {error}
            </div>
          )}

          <Button type="submit" className="w-full mt-2" isLoading={isLoading}>
            {isRegistering ? 'Create Account' : 'Login Securely'}
          </Button>
        </form>

        {role === UserRole.FARMER && (
          <div className="mt-6 text-center">
            <button 
              onClick={() => { setIsRegistering(!isRegistering); setError(''); setFormData({username:'', password:''}); }}
              className="text-sm text-[#E6694C] font-medium hover:underline focus:outline-none"
            >
              {isRegistering 
                ? "Already have an account? Login here" 
                : "New Farmer? Create an account here"}
            </button>
          </div>
        )}

        {role === UserRole.ADMIN && !isRegistering && (
          <div className="mt-6 text-center text-xs text-gray-400">
             Default Admin: admin / password123
          </div>
        )}
      </div>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isEditing, setIsEditing] = useState<Scheme | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'list' | 'form' | 'users'>('list');
  
  // Form State
  const [formData, setFormData] = useState({
    title: '', 
    description: '', 
    benefits: '', 
    eligibility: '',
    documentsNeeded: '',
    phone: '',
    office: '',
    website: ''
  });

  const loadSchemes = () => setSchemes(StorageService.getSchemes());
  const loadUsers = () => setUsers(StorageService.getUsers());

  useEffect(() => {
    loadSchemes();
  }, []);

  useEffect(() => {
    if (activeTab === 'users') {
      loadUsers();
    }
  }, [activeTab]);

  const resetForm = () => {
    setFormData({ 
      title: '', description: '', benefits: '', eligibility: '', 
      documentsNeeded: '', phone: '', office: '', website: '' 
    });
    setIsEditing(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const schemeData = {
      title: formData.title,
      description: formData.description,
      benefits: formData.benefits,
      eligibility: formData.eligibility,
      documentsNeeded: formData.documentsNeeded,
      contactDetails: {
        phone: formData.phone,
        office: formData.office,
        website: formData.website
      }
    };

    if (isEditing) {
      StorageService.updateScheme(isEditing.id, schemeData);
      setIsEditing(null);
    } else {
      StorageService.addScheme(schemeData);
    }
    resetForm();
    loadSchemes();
    setActiveTab('list'); // Switch back to list after save
  };

  const handleEdit = (scheme: Scheme) => {
    setIsEditing(scheme);
    setFormData({
      title: scheme.title,
      description: scheme.description,
      benefits: scheme.benefits,
      eligibility: scheme.eligibility,
      documentsNeeded: scheme.documentsNeeded || '',
      phone: scheme.contactDetails?.phone || '',
      office: scheme.contactDetails?.office || '',
      website: scheme.contactDetails?.website || ''
    });
    setActiveTab('form'); // Switch to form view
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    if(window.confirm("Are you sure you want to delete this scheme?")) {
      StorageService.deleteScheme(id);
      loadSchemes();
    }
  };

  const handleDeleteUser = (username: string) => {
    if (window.confirm(`Are you sure you want to delete user "${username}"? This action cannot be undone.`)) {
      try {
        StorageService.deleteUser(username);
        loadUsers();
      } catch (e: any) {
        alert(e.message);
      }
    }
  };

  const handleCancelEdit = () => {
    resetForm();
    setActiveTab('list');
  };

  const filteredSchemes = schemes.filter(scheme => 
    scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    scheme.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Admin Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-white p-1.5 rounded-full inline-flex shadow-sm border border-[#FADCD9] flex-wrap justify-center gap-1 sm:gap-0">
          <TabButton isActive={activeTab === 'list'} onClick={() => setActiveTab('list')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            View Schemes
          </TabButton>
          <TabButton isActive={activeTab === 'form'} onClick={() => { setActiveTab('form'); resetForm(); }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {isEditing ? 'Edit Scheme' : 'Add New Scheme'}
          </TabButton>
          <TabButton isActive={activeTab === 'users'} onClick={() => setActiveTab('users')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Manage Users
          </TabButton>
        </div>
      </div>

      <div className="animate-fadeIn">
        {activeTab === 'list' && (
          /* List View */
          <div className="max-w-4xl mx-auto">
             <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-[#333333]">Active Government Schemes</h2>
                <span className="text-sm text-gray-500">Total: {filteredSchemes.length}</span>
             </div>

             <SearchBar 
                value={searchQuery} 
                onChange={setSearchQuery} 
                placeholder="Search schemes by title or description..." 
             />
             
             {/* Grid of Cards */}
             {filteredSchemes.length === 0 ? (
                // Empty state
                <div className="text-center py-12 bg-white rounded-xl border border-dashed border-[#FADCD9]">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>
                   <p className="text-gray-500 font-medium">No schemes found.</p>
                   {schemes.length === 0 ? (
                     <div className="mt-4">
                       <Button variant="secondary" onClick={() => setActiveTab('form')}>
                         Add your first scheme
                       </Button>
                     </div>
                   ) : (
                     <p className="text-sm text-gray-400">Try adjusting your search query.</p>
                   )}
                </div>
             ) : (
               <div className="grid grid-cols-1 gap-6">
                 {filteredSchemes.map(scheme => (
                   <SchemeCard 
                     key={scheme.id} 
                     scheme={scheme} 
                     isAdmin 
                     onEdit={handleEdit} 
                     onDelete={handleDelete} 
                   />
                 ))}
               </div>
             )}
          </div>
        )}

        {activeTab === 'form' && (
          /* Form View */
          <div className="max-w-2xl mx-auto">
             <div className="bg-white p-8 rounded-xl shadow-md border border-[#FADCD9]">
                <div className="flex items-center space-x-3 mb-6 border-b border-[#F9F1F0] pb-4">
                   <div className="bg-[#FADCD9] p-2 rounded-lg text-[#E6694C]">
                      {isEditing ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                      )}
                   </div>
                   <h3 className="text-2xl font-bold text-[#333333]">
                      {isEditing ? 'Edit Scheme Details' : 'Add New Scheme'}
                   </h3>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                   <h4 className="font-semibold text-sm text-gray-500 uppercase">Basic Information</h4>
                   <Input 
                     label="Scheme Title" 
                     value={formData.title} 
                     onChange={e => setFormData({...formData, title: e.target.value})} 
                     required 
                     placeholder="e.g., PM Kisan Samman"
                   />
                   <TextArea 
                     label="Description" 
                     value={formData.description} 
                     onChange={e => setFormData({...formData, description: e.target.value})} 
                     required 
                     placeholder="Brief overview of the scheme..."
                   />
                   <TextArea 
                     label="Benefits" 
                     value={formData.benefits} 
                     onChange={e => setFormData({...formData, benefits: e.target.value})} 
                     required 
                     placeholder="Monetary or material benefits..."
                   />
                   <Input 
                     label="Eligibility" 
                     value={formData.eligibility} 
                     onChange={e => setFormData({...formData, eligibility: e.target.value})} 
                     required 
                     placeholder="Who can apply?"
                   />
                   
                   <div className="border-t border-[#FADCD9] my-4 pt-4"></div>
                   <h4 className="font-semibold text-sm text-gray-500 uppercase">Requirements & Contact</h4>
                   
                   <TextArea 
                     label="Documents Needed" 
                     value={formData.documentsNeeded} 
                     onChange={e => setFormData({...formData, documentsNeeded: e.target.value})} 
                     required 
                     placeholder="List required documents..."
                     rows={3}
                   />
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <Input 
                       label="Phone / Helpline" 
                       value={formData.phone} 
                       onChange={e => setFormData({...formData, phone: e.target.value})} 
                       placeholder="e.g., 1800-123-4567"
                     />
                     <Input 
                       label="Office Location" 
                       value={formData.office} 
                       onChange={e => setFormData({...formData, office: e.target.value})} 
                       placeholder="e.g., Taluk Agriculture Office"
                     />
                   </div>
                   <Input 
                     label="Website URL" 
                     value={formData.website} 
                     onChange={e => setFormData({...formData, website: e.target.value})} 
                     placeholder="e.g., https://..."
                   />

                   <div className="flex gap-3 pt-4 border-t border-[#F9F1F0] mt-6">
                     <Button type="submit" className="flex-1 py-3 text-lg">
                       {isEditing ? 'Save Changes' : 'Publish Scheme'}
                     </Button>
                     {isEditing && (
                       <Button type="button" variant="secondary" onClick={handleCancelEdit} className="flex-1">
                         Cancel
                       </Button>
                     )}
                   </div>
                </form>
             </div>
          </div>
        )}

        {activeTab === 'users' && (
          /* User Management View */
          <div className="max-w-4xl mx-auto">
             <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#333333]">Registered Users</h2>
                <span className="text-sm text-gray-500">Total Users: {users.length}</span>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {users.map((u, index) => (
                 <div key={u.username + index} className="bg-white p-5 rounded-xl shadow-sm border border-[#FADCD9] flex justify-between items-center transition-all hover:shadow-md">
                   <div className="flex items-center space-x-4">
                     <div className={`p-3 rounded-full ${u.role === UserRole.ADMIN ? 'bg-[#FADCD9] text-[#E6694C]' : 'bg-[#F9F1F0] text-gray-500'}`}>
                        {u.role === UserRole.ADMIN ? <ShieldCheckIcon /> : <UserIcon />}
                     </div>
                     <div>
                        <h4 className="font-bold text-[#333333] text-lg">{u.username}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          u.role === UserRole.ADMIN 
                            ? 'bg-red-100 text-red-600' 
                            : 'bg-green-100 text-green-600'
                        }`}>
                          {u.role === UserRole.ADMIN ? 'Administrator' : 'Farmer'}
                        </span>
                     </div>
                   </div>
                   
                   {u.username !== 'admin' ? (
                     <IconButton 
                       onClick={() => handleDeleteUser(u.username)} 
                       variant="danger" 
                       title="Delete User"
                     >
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                         <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                       </svg>
                     </IconButton>
                   ) : (
                     <span className="text-xs text-gray-400 italic px-2">Default</span>
                   )}
                 </div>
               ))}
             </div>
             
             {users.length === 0 && (
                <div className="text-center py-10 text-gray-400">
                  No users found.
                </div>
             )}
          </div>
        )}
      </div>
    </div>
  );
};

const FarmerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'schemes' | 'chat'>('schemes');
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setSchemes(StorageService.getSchemes());
  }, []);

  const filteredSchemes = schemes.filter(scheme => 
    scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    scheme.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex justify-center mb-8">
        <div className="bg-white p-1.5 rounded-full inline-flex shadow-sm border border-[#FADCD9]">
          <TabButton isActive={activeTab === 'schemes'} onClick={() => setActiveTab('schemes')} className="!px-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            Government Schemes
          </TabButton>
          <TabButton isActive={activeTab === 'chat'} onClick={() => setActiveTab('chat')} className="!px-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            Ask AI Assistant
          </TabButton>
        </div>
      </div>

      {activeTab === 'schemes' ? (
        <div className="animate-fadeIn">
          <div className="max-w-3xl mx-auto mb-8">
            <SearchBar 
              value={searchQuery} 
              onChange={setSearchQuery} 
              placeholder="Search for schemes, subsidies, or benefits..." 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredSchemes.map(scheme => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
            
            {filteredSchemes.length === 0 && (
              <div className="col-span-full text-center py-16 text-gray-500 bg-white rounded-xl border border-dashed border-[#FADCD9]">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                 {schemes.length === 0 ? "No schemes available currently." : "No schemes match your search."}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto animate-fadeIn">
          <ChatInterface />
        </div>
      )}
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const currentUser = StorageService.getCurrentUser();
      if (currentUser) setUser(currentUser);
    } catch (error) {
      console.error('Error loading current user:', error);
    }
  }, []);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
  };

  const handleLogout = () => {
    StorageService.logout();
    setUser(null);
  };



  return (
    <Router>
      <div className="min-h-screen bg-[#F9F1F0] font-sans text-[#333333] flex flex-col">
        <Navbar user={user} onLogout={handleLogout} />
        
        <div className="flex-1">
          <Routes>
            {/* Landing Page Route */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Login Route (Separate from Home now) */}
            <Route path="/login" element={
              user ? <Navigate to="/dashboard" /> : <LoginPage onLogin={handleLogin} />
            } />
            
            {/* Protected Dashboard Route */}
            <Route path="/dashboard" element={
              !user ? <Navigate to="/login" /> : 
              user.role === UserRole.ADMIN ? <AdminDashboard /> : <FarmerDashboard />
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

'use client';

import { isAdmin } from "@/lib/admin";
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  ChevronRight,
  ChevronDown,
  User,
  Eye,
  BarChart3,
  Users,
} from 'lucide-react';

interface VoortgangItem {
  id: string;
  user_email: string;
  user_name?: string;
  module_slug: string;
  les_slug: string;
  opdracht_type: string;
  antwoorden?: Record<string, string>;
  score?: number;
  feedback?: string;
  correctie_data?: any;
  status: string;
  created_at: string;
  updated_at?: string;
}

const MODULE_INFO: Record<string, { title: string; lessons: number; color: string }> = {
  'module-1': { title: 'Wat is AI?', lessons: 3, color: 'bg-brand-red' },
  'module-2': { title: 'AI Tools ontdekken', lessons: 4, color: 'bg-brand-green' },
  'module-3': { title: 'AI Slim gebruiken', lessons: 5, color: 'bg-brand-orange' },
  'module-4': { title: 'AI in de les', lessons: 4, color: 'bg-gray-700' },
};

export default function AdminVoortgangPage() {
  const { data: session, status } = useSession();
  const [voortgang, setVoortgang] = useState<VoortgangItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<VoortgangItem | null>(null);
  const [expandedUsers, setExpandedUsers] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (status === 'authenticated') {
      const email = session?.user?.email || '';
      if (!isAdmin(email)) {
        window.location.href = '/';
        return;
      }
      fetchVoortgang();
    }
  }, [status, session]);

  const fetchVoortgang = async () => {
    try {
      const res = await fetch(`/api/admin/voortgang?t=${Date.now()}`);
      const data = await res.json();
      setVoortgang(data.voortgang || []);
    } catch (err) {
      console.error('Error fetching:', err);
    } finally {
      setLoading(false);
    }
  };

  // Group by user, then by module
  const groupedData: Record<string, Record<string, VoortgangItem[]>> = {};

  voortgang.forEach((item) => {
    if (!groupedData[item.user_email]) groupedData[item.user_email] = {};
    if (!groupedData[item.user_email][item.module_slug]) groupedData[item.user_email][item.module_slug] = [];
    groupedData[item.user_email][item.module_slug].push(item);
  });

  const toggleUser = (email: string) => {
    const s = new Set(expandedUsers);
    s.has(email) ? s.delete(email) : s.add(email);
    setExpandedUsers(s);
  };

  const handleExportCSV = async () => {
    try {
      const res = await fetch('/api/admin/voortgang', { method: 'POST' });
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `voortgang-${Date.now()}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch {
      alert('Er ging iets mis bij het exporteren.');
    }
  };

  const getStatusBadge = (status: string) => {
    const base = 'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ';
    if (status === 'gecorrigeerd' || status === 'voltooid') return base + 'bg-green-100 text-green-700';
    if (status === 'bezig' || status === 'ingediend') return base + 'bg-yellow-100 text-yellow-700';
    return base + 'bg-gray-100 text-gray-600';
  };

  const getStatusIcon = (status: string) => {
    if (status === 'gecorrigeerd' || status === 'voltooid') return <CheckCircle2 className="w-4 h-4 text-green-600" />;
    if (status === 'bezig' || status === 'ingediend') return <Clock className="w-4 h-4 text-yellow-600" />;
    return <AlertCircle className="w-4 h-4 text-gray-400" />;
  };

  const totalGebruikers = Object.keys(groupedData).length;
  const totalInzendingen = voortgang.length;
  const totalGecorrigeerd = voortgang.filter(v => v.status === 'gecorrigeerd' || v.status === 'voltooid').length;

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center py-12">
          <div className="inline-block w-12 h-12 border-4 border-brand-red border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-gray-600">Laden...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Niet ingelogd</h2>
          <p className="text-gray-600 mb-6">Je moet ingelogd zijn om toegang te krijgen.</p>
          <a href="/login" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-red text-white rounded-lg font-semibold hover:bg-red-700 transition-colors">Inloggen</a>
        </div>
      </div>
    );
  }

  const userEmail = session?.user?.email || '';
  if (!isAdmin(userEmail)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Geen toegang</h2>
          <p className="text-gray-600 mb-6">Je hebt geen toegang tot de beheerpagina.</p>
          <a href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-red text-white rounded-lg font-semibold hover:bg-red-700 transition-colors">Terug</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 md:p-12 overflow-hidden shadow-xl">
            <div className="inline-flex items-center gap-2 bg-brand-red/90 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <BarChart3 className="w-4 h-4" /> BEHEER
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Voortgang overzicht</h1>
            <p className="text-gray-300 text-base md:text-lg max-w-2xl">
              Bekijk de voortgang van alle leerlingen en exporteer de resultaten.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-white">{totalGebruikers}</div>
                <div className="text-sm text-white/80">Leerlingen</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-green-400">{totalGecorrigeerd}</div>
                <div className="text-sm text-white/80">Gecorrigeerd</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-amber-400">{totalInzendingen}</div>
                <div className="text-sm text-white/80">Inzendingen</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-end mb-6">
            <button onClick={handleExportCSV} className="flex items-center gap-2 px-4 py-2.5 bg-brand-green text-white rounded-lg font-medium hover:bg-green-600 transition-colors">
              <Download className="w-5 h-5" /> Exporteer CSV
            </button>
          </div>

          <div className="space-y-4">
            {Object.keys(groupedData).length === 0 ? (
              <div className="bg-white rounded-2xl p-12 shadow-sm text-center text-gray-500">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Nog geen voortgang</h3>
                <p>Er zijn nog geen inzendingen om weer te geven.</p>
              </div>
            ) : (
              Object.entries(groupedData).map(([email, modules]) => (
                <div key={email} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  {/* User header */}
                  <button onClick={() => toggleUser(email)} className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      {expandedUsers.has(email) ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
                      <div className="bg-gray-100 rounded-full p-2.5">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">{modules[Object.keys(modules)[0]]?.[0]?.user_name || email.split('@')[0]}</div>
                        <div className="text-sm text-gray-500">{email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{modules['module-1']?.length || 0 + modules['module-2']?.length || 0 + modules['module-3']?.length || 0 + modules['module-4']?.length || 0} inzendingen</span>
                    </div>
                  </button>

                  {/* Modules (expanded) */}
                  {expandedUsers.has(email) && (
                    <div className="border-t border-gray-100 bg-gray-50/50">
                      {Object.entries(modules).map(([moduleSlug, items]) => {
                        const info = MODULE_INFO[moduleSlug] || { title: moduleSlug, lessons: 0, color: 'bg-gray-500' };
                        return (
                          <div key={moduleSlug} className="border-b border-gray-100 last:border-b-0 px-6 py-4 pl-16">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <span className={`${info.color} w-3 h-3 rounded-full`} />
                                <span className="font-medium text-gray-800">{info.title}</span>
                                <span className="text-sm text-gray-400">({items.length} inzendingen)</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              {items
                                .sort((a, b) => {
                                  const numA = parseInt(a.les_slug.replace('les-', '') || '0');
                                  const numB = parseInt(b.les_slug.replace('les-', '') || '0');
                                  return numA - numB;
                                })
                                .map((item) => (
                                  <div
                                    key={item.id}
                                    onClick={() => setSelectedItem(item)}
                                    className="flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:border-brand-green hover:shadow-sm cursor-pointer transition-all"
                                  >
                                    <div className="flex items-center gap-3">
                                      {getStatusIcon(item.status)}
                                      <div>
                                        <div className="font-medium text-gray-800 text-sm">
                                          {item.les_slug.replace(/-/g, ' ')} — {item.opdracht_type}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                          {new Date(item.updated_at || item.created_at).toLocaleDateString('nl-BE')}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      {item.score !== undefined && item.score !== null ? (
                                        <span className={`font-bold text-sm ${item.score >= 70 ? 'text-green-600' : item.score >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                                          {item.score}%
                                        </span>
                                      ) : (
                                        <span className="text-gray-400 text-sm">—</span>
                                      )}
                                      <span className={getStatusBadge(item.status)}>{item.status}</span>
                                      <Eye className="w-4 h-4 text-gray-400" />
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Inzending Details</h3>
              <button onClick={() => setSelectedItem(null)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Info */}
              <div className="bg-gray-50 rounded-xl p-5 grid grid-cols-2 gap-6">
                <div>
                  <span className="text-sm text-gray-500">Leerling</span>
                  <p className="font-semibold text-gray-900 mt-1">{selectedItem.user_name || selectedItem.user_email}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Module / Les</span>
                  <p className="font-semibold text-gray-900 mt-1">{MODULE_INFO[selectedItem.module_slug]?.title || selectedItem.module_slug} — {selectedItem.les_slug}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Type</span>
                  <p className="font-semibold text-gray-900 mt-1">{selectedItem.opdracht_type}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Status</span>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusIcon(selectedItem.status)}
                    <span className={getStatusBadge(selectedItem.status)}>{selectedItem.status}</span>
                  </div>
                </div>
              </div>

              {/* Score */}
              {selectedItem.score !== undefined && selectedItem.score !== null && (
                <div className="bg-gray-50 rounded-xl p-5 text-center">
                  <span className="text-sm text-gray-500">Score</span>
                  <p className={`text-4xl font-bold mt-2 ${selectedItem.score >= 70 ? 'text-green-600' : selectedItem.score >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {selectedItem.score}%
                  </p>
                </div>
              )}

              {/* Antwoorden */}
              {selectedItem.antwoorden && Object.keys(selectedItem.antwoorden).length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Antwoorden</h4>
                  <div className="space-y-3">
                    {Object.entries(selectedItem.antwoorden).map(([key, value]) => (
                      <div key={key} className="bg-gray-50 rounded-xl p-4">
                        <h5 className="font-medium text-gray-800 mb-2">{key}</h5>
                        <p className="text-gray-700 whitespace-pre-wrap">{String(value || '—')}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Feedback */}
              {selectedItem.feedback && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">AI Feedback</h4>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedItem.feedback}</p>
                  </div>
                </div>
              )}

              {/* Correctie data */}
              {selectedItem.correctie_data && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Score per criterium</h4>
                  <div className="space-y-3">
                    {(Array.isArray(selectedItem.correctie_data) ? selectedItem.correctie_data : []).map((item: any, idx: number) => (
                      <div key={idx} className="bg-gray-50 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-800">{item.titel || item.id || `Criterium ${idx + 1}`}</span>
                          <span className={`text-lg font-bold ${(item.score || 0) >= 70 ? 'text-green-600' : (item.score || 0) >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {item.score || 0}/100
                          </span>
                        </div>
                        {item.feedback && (
                          <p className="text-sm text-gray-600 bg-white rounded-lg p-3 mt-2">{item.feedback}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Timestamp */}
              <div className="text-sm text-gray-500 pt-4 border-t border-gray-100">
                <p>Aangemaakt: {new Date(selectedItem.created_at).toLocaleString('nl-BE', { dateStyle: 'short', timeStyle: 'short' })}</p>
                {selectedItem.updated_at && (
                  <p>Gewijzigd: {new Date(selectedItem.updated_at).toLocaleString('nl-BE', { dateStyle: 'short', timeStyle: 'short' })}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

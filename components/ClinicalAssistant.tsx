import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, FileText, User, ChevronRight, Search, Sparkles } from 'lucide-react';
import { MOCK_PATIENTS } from '../mockData';
import { Patient, ChatMessage } from '../types';
import { generateMedicalSummary } from '../services/geminiService';

const ClinicalAssistant: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const filteredPatients = MOCK_PATIENTS.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.mrn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
    setMessages([{
      id: 'init',
      role: 'model',
      text: `Accessing secure FHIR record for **${patient.name}** (${patient.mrn}). \n\nI can help you:\n- Summarize recent visits\n- Draft SOAP notes\n- Analyze symptom history\n- Check medication interactions`,
      timestamp: new Date()
    }]);
  };

  const handleSendMessage = async () => {
    if (!input.trim() || !selectedPatient) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Prepare context from patient object
    const patientContext = JSON.stringify(selectedPatient, null, 2);
    
    // Call Gemini
    const responseText = await generateMedicalSummary(patientContext, input);

    const aiMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText || "I encountered an error processing that request.",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };

  return (
    <div className="h-[calc(100vh-120px)] flex gap-6">
      
      {/* Patient List (Left Panel) */}
      <div className="w-1/3 bg-white rounded-xl border border-slate-200 flex flex-col shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50">
          <h2 className="font-semibold text-slate-700 mb-3">Patient Records (FHIR R4)</h2>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Search name or MRN..."
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {filteredPatients.map(patient => (
            <div 
              key={patient.id}
              onClick={() => handlePatientSelect(patient)}
              className={`p-4 border-b border-slate-50 cursor-pointer transition-colors hover:bg-slate-50 ${
                selectedPatient?.id === patient.id ? 'bg-teal-50 border-teal-100' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className={`font-semibold ${selectedPatient?.id === patient.id ? 'text-teal-800' : 'text-slate-800'}`}>
                    {patient.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">{patient.mrn} • {patient.age}y • {patient.gender}</p>
                </div>
                <ChevronRight size={16} className={`mt-1 ${selectedPatient?.id === patient.id ? 'text-teal-500' : 'text-slate-300'}`} />
              </div>
              <div className="flex gap-2 mt-3">
                {patient.diagnosis.map((d, i) => (
                  <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] rounded-full uppercase tracking-wide font-medium">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Workspace (Right Panel) */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200 flex flex-col shadow-sm overflow-hidden">
        {!selectedPatient ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <StethoscopeIcon size={32} />
            </div>
            <h3 className="text-lg font-medium text-slate-600 mb-2">Clinical Workspace</h3>
            <p>Select a patient from the list to view records and activate the AI assistant.</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold">
                  {selectedPatient.name.charAt(0)}
                </div>
                <div>
                  <h2 className="font-bold text-slate-800">{selectedPatient.name}</h2>
                  <p className="text-xs text-slate-500">
                    Last Visit: {selectedPatient.lastVisit} • BP: {selectedPatient.vitals.bp} • HR: {selectedPatient.vitals.hr}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-3 py-1.5 bg-teal-50 text-teal-700 text-xs font-medium rounded hover:bg-teal-100 transition-colors">
                  <FileText size={14} /> Full Record
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-teal-600 text-white rounded-br-none' 
                        : 'bg-white text-slate-700 border border-slate-200 rounded-bl-none'
                    }`}
                  >
                    {msg.role === 'model' && (
                      <div className="flex items-center gap-2 mb-2 text-teal-600 font-semibold text-xs uppercase tracking-wider">
                        <Sparkles size={12} /> SCHOA AI
                      </div>
                    )}
                    <div className="prose prose-sm max-w-none whitespace-pre-wrap">
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
                    <div className="animate-spin h-4 w-4 border-2 border-teal-500 border-t-transparent rounded-full"></div>
                    <span className="text-sm text-slate-500">Processing clinical data...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-100">
               <div className="relative">
                <textarea 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Ask SCHOA to summarize notes, draft an H&P, or analyze vitals..."
                  className="w-full pl-4 pr-12 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none h-14"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-2 p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="text-[10px] text-center text-slate-400 mt-2">
                <span className="font-bold">Disclaimer:</span> AI-generated summaries. Not a substitute for professional medical diagnosis. Verify all information.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const StethoscopeIcon = ({ size }: { size: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
    <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
    <circle cx="20" cy="10" r="2" />
  </svg>
);

export default ClinicalAssistant;
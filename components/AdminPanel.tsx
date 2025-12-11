import React, { useState } from 'react';
import { BadgeDollarSign, FileCheck, AlertTriangle, Download, RefreshCw } from 'lucide-react';
import { generateMedicalSummary } from '../services/geminiService';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'payroll' | 'billing'>('payroll');
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportResult, setReportResult] = useState<string | null>(null);

  const generateReport = async () => {
    setIsGenerating(true);
    // Simulate data context for the AI
    const financialContext = `
      Month: October 2023
      Total Revenue: 550M IDR
      Total Expenses: 360M IDR
      Pending Claims: 24
      Top Claim Rejection Reason: "Incomplete Documentation" (45%)
      Staff Count: 120
      Overtime Hours: 450
    `;
    
    const prompt = activeTab === 'payroll' 
      ? "Generate a concise executive summary for October Payroll including overtime analysis and budget adherence."
      : "Analyze current billing efficiency, highlight the main cause of claim rejections, and suggest 3 specific improvements.";

    const result = await generateMedicalSummary(financialContext, prompt);
    setReportResult(result);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
       <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Administration & Finance</h1>
        <p className="text-slate-500">Automated payroll, billing workflows, and BLU reporting.</p>
      </header>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('payroll')}
          className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 ${
            activeTab === 'payroll' 
              ? 'border-teal-600 text-teal-700' 
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Payroll Automation
        </button>
        <button 
          onClick={() => setActiveTab('billing')}
          className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 ${
            activeTab === 'billing' 
              ? 'border-teal-600 text-teal-700' 
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Smart Billing & Claims
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          
          {activeTab === 'payroll' ? (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                  <BadgeDollarSign size={18} /> Payroll Batch: Oct 2023
                </h3>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">Ready for Review</span>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500">Total Salary Base</p>
                    <p className="text-xl font-bold text-slate-800">Rp 2.4B</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-500">Incentive Calculation (Auto)</p>
                    <p className="text-xl font-bold text-slate-800">Rp 450M</p>
                  </div>
                </div>
                <button className="w-full py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium">
                  Process Batch Payment
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                  <FileCheck size={18} /> Claims Workflow
                </h3>
              </div>
              <div className="p-6">
                 <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center"><AlertTriangle size={16}/></div>
                         <div>
                            <p className="text-sm font-medium text-slate-800">Pending Authorization</p>
                            <p className="text-xs text-slate-500">12 claims require medical justification</p>
                         </div>
                      </div>
                      <button className="text-xs text-teal-600 font-medium hover:underline">Review AI Suggestions</button>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center"><AlertTriangle size={16}/></div>
                         <div>
                            <p className="text-sm font-medium text-slate-800">Rejected (Coding Error)</p>
                            <p className="text-xs text-slate-500">5 claims flagged for ICD-10 mismatch</p>
                         </div>
                      </div>
                      <button className="text-xs text-teal-600 font-medium hover:underline">Fix Codes</button>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {/* AI Report Section */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-slate-700">AI Operational Insights</h3>
              <button 
                onClick={generateReport}
                disabled={isGenerating}
                className="flex items-center gap-2 text-sm text-teal-600 hover:text-teal-800 font-medium"
              >
                {isGenerating ? <RefreshCw className="animate-spin" size={16} /> : <SparklesIcon size={16} />}
                Generate Analysis
              </button>
            </div>
            
            {reportResult ? (
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm text-slate-700 prose prose-sm max-w-none whitespace-pre-wrap">
                {reportResult}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400 text-sm">
                Click 'Generate Analysis' to get an AI-powered summary of current {activeTab} metrics.
              </div>
            )}
          </div>

        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
             <h4 className="font-semibold text-slate-700 mb-4 text-sm">Quick Actions</h4>
             <div className="space-y-2">
               <button className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg flex items-center gap-2">
                 <Download size={16} /> Download BLU Report
               </button>
               <button className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg flex items-center gap-2">
                 <Download size={16} /> Export Tax 21 Forms
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SparklesIcon = ({ size }: { size: number }) => (
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
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </svg>
);

export default AdminPanel;
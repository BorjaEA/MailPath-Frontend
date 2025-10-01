"use client"

import { useState } from "react"
import { Inbox, Send, FileText, Trash2, Settings, Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock email data
const mockEmails = [
  {
    id: 1,
    folder: "inbox",
    from: "Sarah Chen",
    email: "sarah.chen@company.com",
    subject: "Q4 Project Review Meeting",
    snippet:
      "Hi team, I wanted to schedule our quarterly review for next week. Please let me know your availability...",
    body: "Hi team,\n\nI wanted to schedule our quarterly review for next week. Please let me know your availability for Tuesday or Wednesday afternoon.\n\nWe'll be discussing:\n- Project milestones achieved\n- Budget review\n- Next quarter planning\n\nLooking forward to seeing everyone.\n\nBest regards,\nSarah",
    date: "10:30 AM",
    unread: true,
  },
  {
    id: 2,
    folder: "inbox",
    from: "GitHub",
    email: "notifications@github.com",
    subject: "[Repository] New pull request opened",
    snippet: "A new pull request has been opened in your repository. Review the changes and provide feedback...",
    body: "A new pull request has been opened in your repository.\n\nPull Request #142: Add email dashboard component\n\nReview the changes and provide feedback to help the contributor improve their work.\n\nView Pull Request: https://github.com/...",
    date: "9:15 AM",
    unread: true,
  },
  {
    id: 3,
    folder: "inbox",
    from: "Marketing Team",
    email: "marketing@company.com",
    subject: "New campaign launch next week",
    snippet: "Excited to announce our new product campaign launching next Monday. Here are the key details...",
    body: "Excited to announce our new product campaign launching next Monday.\n\nKey Details:\n- Launch date: Monday, 9 AM EST\n- Target audience: Enterprise customers\n- Campaign duration: 4 weeks\n\nPlease review the attached materials and let us know if you have any questions.\n\nThanks!",
    date: "Yesterday",
    unread: false,
  },
  {
    id: 4,
    folder: "inbox",
    from: "Alex Rodriguez",
    email: "alex.r@company.com",
    subject: "Design system updates",
    snippet: "I've updated the design system documentation with the new color palette and typography guidelines...",
    body: "I've updated the design system documentation with the new color palette and typography guidelines.\n\nChanges include:\n- New dark theme tokens\n- Updated spacing scale\n- Revised component variants\n\nPlease review and let me know if you have any feedback.\n\nAlex",
    date: "Yesterday",
    unread: false,
  },
  {
    id: 5,
    folder: "sent",
    from: "Me",
    email: "me@company.com",
    subject: "Re: Budget approval needed",
    snippet: "Thanks for sending this over. I've reviewed the budget proposal and everything looks good...",
    body: "Thanks for sending this over. I've reviewed the budget proposal and everything looks good.\n\nI've approved the request and forwarded it to finance for final processing.\n\nLet me know if you need anything else.",
    date: "2 days ago",
    unread: false,
  },
  {
    id: 6,
    folder: "drafts",
    from: "Me",
    email: "me@company.com",
    subject: "Team offsite planning",
    snippet: "Draft: Planning our team offsite for next quarter. Considering locations and activities...",
    body: "Draft: Planning our team offsite for next quarter. Considering locations and activities...",
    date: "3 days ago",
    unread: false,
  },
]

const navigationItems = [
  { id: "inbox", label: "Inbox", icon: Inbox, count: 2 },
  { id: "sent", label: "Sent", icon: Send },
  { id: "drafts", label: "Drafts", icon: FileText, count: 1 },
  { id: "trash", label: "Trash", icon: Trash2 },
  { id: "settings", label: "Settings", icon: Settings },
]

export default function MailDashboard() {
  const [selectedFolder, setSelectedFolder] = useState("inbox")
  const [selectedEmail, setSelectedEmail] = useState(mockEmails[0])
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const filteredEmails = mockEmails.filter((email) => email.folder === selectedFolder)

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-border bg-card">
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-semibold text-balance">Mail</h1>
        </div>

        <ScrollArea className="flex-1 p-4">
          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = selectedFolder === item.id

              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedFolder(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </div>
                  {item.count && item.count > 0 && (
                    <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-primary text-primary-foreground">
                      {item.count}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>
        </ScrollArea>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Email List */}
        <div className="w-full md:w-96 border-r border-border bg-card flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2 mb-4 md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <Menu className="h-5 w-5" />
              </Button>
              <h2 className="text-lg font-semibold capitalize">{selectedFolder}</h2>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search emails..." className="pl-9 bg-secondary border-border" />
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="divide-y divide-border">
              {filteredEmails.map((email) => (
                <button
                  key={email.id}
                  onClick={() => setSelectedEmail(email)}
                  className={`w-full p-4 text-left transition-colors hover:bg-accent/50 ${
                    selectedEmail?.id === email.id ? "bg-accent" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span
                      className={`font-medium text-sm ${email.unread ? "text-foreground" : "text-muted-foreground"}`}
                    >
                      {email.from}
                    </span>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{email.date}</span>
                  </div>
                  <h3
                    className={`text-sm mb-1 text-balance ${email.unread ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                  >
                    {email.subject}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 text-pretty">{email.snippet}</p>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Email Preview */}
        <div className="flex-1 flex flex-col bg-background">
          {selectedEmail ? (
            <>
              <div className="p-6 border-b border-border">
                <h2 className="text-2xl font-semibold mb-4 text-balance">{selectedEmail.subject}</h2>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                    {selectedEmail.from.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{selectedEmail.from}</div>
                    <div className="text-xs text-muted-foreground">{selectedEmail.email}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">{selectedEmail.date}</div>
                </div>
              </div>

              <ScrollArea className="flex-1">
                <div className="p-6">
                  <div className="prose prose-invert max-w-none">
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">{selectedEmail.body}</p>
                  </div>
                </div>
              </ScrollArea>

              <div className="p-6 border-t border-border">
                <div className="flex gap-2">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Reply</Button>
                  <Button variant="outline">Forward</Button>
                  <Button variant="ghost">Archive</Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <p>Select an email to view</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

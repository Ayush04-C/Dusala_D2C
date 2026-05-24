// src/components/admin/ActivityFeed.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const activities = [
  { user: "Pooja Hegde", action: "enrolled in", target: "Start Your Business from Zero", time: "2 mins ago", avatar: "PH" },
  { user: "Sarah Khan", action: "completed quiz in", target: "Scale on Instagram", time: "15 mins ago", avatar: "SK" },
  { user: "Laxmi Reddy", action: "subscribed to", target: "Pro Plan", time: "1 hour ago", avatar: "LR" },
  { user: "Meena Patel", action: "enrolled in", target: "Financial Freedom", time: "3 hours ago", avatar: "MP" },
];

export function ActivityFeed() {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-rose/5">
      <h3 className="font-heading font-bold text-brand-dark mb-6">Recent Activity</h3>
      <div className="space-y-6">
        {activities.map((activity, i) => (
          <div key={i} className="flex items-center gap-4">
            <Avatar className="h-10 w-10 border-2 border-brand-ivory">
              <AvatarFallback className="bg-brand-rose/10 text-brand-rose text-xs font-bold">{activity.avatar}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-brand-dark">
                <span className="font-bold">{activity.user}</span> {activity.action} <span className="font-medium text-brand-rose">{activity.target}</span>
              </p>
              <p className="text-xs text-brand-muted">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

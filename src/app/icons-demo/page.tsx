import { MaterialIcon } from "@/components/ui/material-icon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const commonIcons = [
  "home", "settings", "favorite", "search", "person", 
  "mail", "notifications", "menu", "close", "check",
  "add", "remove", "edit", "delete", "share",
  "cloud", "camera", "image", "music_note", "videocam",
  "dashboard", "analytics", "account_balance", "shopping_cart", "payments"
];

export default function IconsDemoPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-brand-deep mb-4">Material Symbols</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We've integrated Google Material Symbols (Outlined, Rounded, and Sharp) into the platform. 
          Use the <code>MaterialIcon</code> component for a clean and modern look.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Rounded Variant (Default) */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MaterialIcon icon="circle_notifications" variant="rounded" className="text-brand-orange" />
              Rounded Variant
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-4">
              {commonIcons.slice(0, 15).map(icon => (
                <div key={`rounded-${icon}`} className="flex flex-col items-center gap-1 p-2 hover:bg-muted rounded-lg transition-colors" title={icon}>
                  <MaterialIcon icon={icon} variant="rounded" />
                  <span className="text-[10px] text-muted-foreground truncate w-full text-center">{icon}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Outlined Variant */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MaterialIcon icon="category" variant="outlined" className="text-secondary" />
              Outlined Variant
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-4">
              {commonIcons.slice(0, 15).map(icon => (
                <div key={`outlined-${icon}`} className="flex flex-col items-center gap-1 p-2 hover:bg-muted rounded-lg transition-colors" title={icon}>
                  <MaterialIcon icon={icon} variant="outlined" />
                  <span className="text-[10px] text-muted-foreground truncate w-full text-center">{icon}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sharp Variant */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MaterialIcon icon="architecture" variant="sharp" className="text-brand-deep" />
              Sharp Variant
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-4">
              {commonIcons.slice(0, 15).map(icon => (
                <div key={`sharp-${icon}`} className="flex flex-col items-center gap-1 p-2 hover:bg-muted rounded-lg transition-colors" title={icon}>
                  <MaterialIcon icon={icon} variant="sharp" />
                  <span className="text-[10px] text-muted-foreground truncate w-full text-center">{icon}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Customization Examples</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-8 items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <MaterialIcon icon="favorite" fill className="text-red-500 text-5xl" />
                <span className="text-xs font-medium">Filled</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <MaterialIcon icon="settings" weight={700} className="text-4xl" />
                <span className="text-xs font-medium">Bold (W700)</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <MaterialIcon icon="search" opticalSize={48} className="text-4xl" />
                <span className="text-xs font-medium">Large Optical Size</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <MaterialIcon icon="local_fire_department" grade={200} fill className="text-orange-500 text-5xl" />
                <span className="text-xs font-medium">High Grade</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

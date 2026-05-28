import React, { useState } from "react";
import { Lock, BadgeCheck, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { updatePassword } from "@/src/features/user/userApi";
// import { resetPassword } from "../../redux/userActions"; // Adjust path accordingly

export const ResetPassword: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.user);

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.oldPassword)
      errors.oldPassword = "Current password is required";
    if (formData.newPassword.length < 8)
      errors.newPassword = "Password must be at least 8 characters";
    if (formData.newPassword !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await dispatch(
        updatePassword({
          old_password: formData.oldPassword,
          new_password: formData.newPassword,
          confirmPassword: "",
        }),
      );
      // Reset form on success
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      // Errors are handled by the toast in the action
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto w-full ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-8"
      >
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock size={32} />
          </div>
          {/* <h1 className="text-2xl font-black text-slate-900">Reset Password</h1> */}
          <p className="text-slate-600 text-sm">
            Create a strong password to keep your account secure.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            label="Current Password"
            name="oldPassword"
            type="password"
            placeholder="••••••••"
            size="sm"
            value={formData.oldPassword}
            onChange={handleChange}
            error={formErrors.oldPassword}
          />

          <div className="h-px bg-slate-100 my-2"></div>

          <Input
            label="New Password"
            name="newPassword"
            type="password"
            placeholder="••••••••"
            size="sm"
            value={formData.newPassword}
            onChange={handleChange}
            error={formErrors.newPassword}
          />

          <Input
            label="Confirm New Password"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            size="sm"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={formErrors.confirmPassword}
          />

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase  mb-1">
              Password Requirements
            </p>
            <Requirement
              text="Minimum 8 characters"
              met={formData.newPassword.length >= 8}
            />
            <Requirement
              text="Include at least one number"
              met={/\d/.test(formData.newPassword)}
            />
          </div>

          <Button fullWidth size="md" type="submit" disabled={loading}>
            {loading ? (
              <Loader2 className="animate-spin mr-2" size={18} />
            ) : null}
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

// Small helper for UI feedback
const Requirement = ({ text, met }: { text: string; met: boolean }) => (
  <div
    className={`flex items-center gap-2 text-xs font-semibold ${met ? "text-green-500" : "text-slate-400"}`}
  >
    <BadgeCheck size={14} />
    <span>{text}</span>
  </div>
);

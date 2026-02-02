import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router";
import toast from "react-hot-toast";
import api from "../lib/axios";
import { LoaderIcon, ArrowLeftIcon, Trash2Icon } from "lucide-react";
const NoteDetailPage = () => {
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await api.get(`/notes/${id}`);
                setNote(res.data);
            } catch (e) {
                toast.error("Failed to fetch note");
                console.log(e);
            } finally {
                setLoading(false);
            }
        };
    }, [id]);

    const handleDelete = () => {};

    if (loading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <LoaderIcon className="animate-spin size-10" />
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <Link to="/" className="btn btn-ghost">
                            <ArrowLeftIcon className="h-5 w-5" />
                            Back to Notes
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="btn btn-error btn-outline"
                        >
                            <Trash2Icon className="h-5 w-5" />
                            Delete Note
                        </button>
                    </div>
                    <div className="card bg-base-100">
                        <div className="card-body">
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Note title"
                                    className="input input-bordered"
                                    value={note.title}
                                    onChange={(e) =>
                                        setNote({
                                            ...note,
                                            title: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoteDetailPage;

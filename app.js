// --- Data (More Realistic Examples) ---

// <<< Helper function to get previous month's dates for sample data >>>
function getSampleHistoryDates() {
    const history = {};
    const today = new Date();
    const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1); // First day of previous month
    const year = prevMonth.getFullYear();
    const month = prevMonth.getMonth(); // 0-indexed

    // Get number of days in previous month
    const daysInPrevMonth = new Date(year, month + 1, 0).getDate();

    // Generate sample data for ~5 random days in the previous month
    const statuses = ['Present', 'Absent', 'Late', 'Present', 'Present'];
    for (let i = 0; i < 5; i++) {
        const day = Math.floor(Math.random() * daysInPrevMonth) + 1; // Random day (1 to N)
        const dateStr = ${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')};
        if (!history[dateStr]) { // Avoid duplicates for this simple sample
            history[dateStr] = statuses[i % statuses.length];
        }
    }
    return history;
}

const studentData = [
    // <<< Added 'attendanceHistory' object with sample data >>>
    { id: 1, name: 'Alice Johnson', grade: '10', age: 15, email: 'alice.j@example.com', feesPaid: true, marks: 88, attendance: 'Pending', attendanceHistory: getSampleHistoryDates() },
    { id: 2, name: 'Bob Williams', grade: '9', age: 14, email: 'bob.w@example.com', feesPaid: false, marks: 72, attendance: 'Pending', attendanceHistory: getSampleHistoryDates() },
    { id: 3, name: 'Charlie Brown', grade: '11', age: 16, email: 'charlie.b@example.com', feesPaid: true, marks: 95, attendance: 'Pending', attendanceHistory: getSampleHistoryDates() },
    { id: 4, name: 'Diana Garcia', grade: '10', age: 15, email: 'diana.g@example.com', feesPaid: true, marks: 65, attendance: 'Present', attendanceHistory: getSampleHistoryDates() },
    { id: 5, name: 'Ethan Miller', grade: '8', age: 13, email: 'ethan.m@example.com', feesPaid: false, marks: 35, attendance: 'Absent', attendanceHistory: getSampleHistoryDates() },
];

const teacherData = [
  { id: 101, name: 'Mr. Alan Turing', subject: 'Computer Science', email: 'a.turing@school.edu', phone: '555-123-4567' },
  { id: 102, name: 'Ms. Marie Curie', subject: 'Physics & Chemistry', email: 'm.curie@school.edu', phone: '555-987-6543' },
  { id: 103, name: 'Mr. Leonardo da Vinci', subject: 'Art & Anatomy', email: 'l.davinci@school.edu', phone: '555-112-3581' },
];

const classData = [
  { id: 201, name: 'Grade 8A', room: '101', teacherId: 102, schedule: 'Mon/Wed/Fri 9:00 AM' },
  { id: 202, name: 'Grade 9B', room: '102', teacherId: 101, schedule: 'Tue/Thu 10:00 AM' },
  { id: 203, name: 'Grade 10A', room: '201', teacherId: 103, schedule: 'Mon/Wed 1:00 PM' },
  { id: 204, name: 'Grade 10B', room: '202', teacherId: 102, schedule: 'Tue/Thu/Fri 11:00 AM' },
  { id: 205, name: 'Grade 11', room: 'Lab 1', teacherId: 101, schedule: 'Mon-Fri 2:00 PM' },
];

// --- Helper Functions ---
function getTeacherNameById(id) {
  const teacher = teacherData.find(t => t.id === id);
  return teacher ? teacher.name : 'N/A';
}

function getResultStatus(marks) {
  if (marks === null || marks === undefined || isNaN(marks)) return '<span class="badge badge-secondary">N/A</span>'; // Handle cases where marks are not set
  if (marks >= 90) return '<span class="badge badge-success">Excellent</span>';
  if (marks >= 75) return '<span class="badge badge-primary">Good</span>';
  if (marks >= 50) return '<span class="badge badge-warning">Pass</span>';
  return '<span class="badge badge-danger">Fail</span>';
}

function getFeeStatus(paid) {
  return paid
      ? '<span class="badge badge-success">Paid</span>'
      : '<span class="badge badge-danger">Pending</span>';
}

function getAttendanceStatusBadge(status) {
    switch (status?.toLowerCase()) { // Added optional chaining and lowercase check
        case 'present':
            return '<span class="badge badge-present">Present</span>';
        case 'absent':
            return '<span class="badge badge-absent">Absent</span>';
        case 'late':
            return '<span class="badge badge-late">Late</span>';
        case 'pending':
        default:
            // Check if it's actually 'Pending' or just undefined/null
            const effectiveStatus = status || 'Pending';
            return <span class="badge badge-pending">${effectiveStatus}</span>; // Display 'Pending' if null/undefined
    }
}


function getCurrentDateString() {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return today.toLocaleDateString(undefined, options); // Use locale format
}

// <<< New Helper: Get Dates for Previous Month >>>
function getPreviousMonthDates() {
    const dates = [];
    const today = new Date();
    // Calculate the first day of the previous month
    const firstDayPrevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const year = firstDayPrevMonth.getFullYear();
    const month = firstDayPrevMonth.getMonth(); // 0-indexed

    // Calculate the number of days in the previous month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        // Format as YYYY-MM-DD
        const dateString = ${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')};
        dates.push(dateString);
    }
    return { year, month, dates }; // Return year/month info too
}

// <<< New Helper: Format YYYY-MM-DD for display >>>
function formatDateForDisplay(dateString) {
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day); // Month is 0-indexed
    const options = { month: 'short', day: 'numeric', weekday: 'short' };
    return date.toLocaleDateString(undefined, options);
}


// --- HTML Generation Functions ---

function generateStudentProfile(student) {
    const result = getResultStatus(student.marks);
    const fees = getFeeStatus(student.feesPaid);
    const attendance = getAttendanceStatusBadge(student.attendance); // Today's attendance
    return `
    <section>
        <h2>Student Profile: ${student.name}</h2>
        <p><strong>ID:</strong> ${student.id}</p>
        <p><strong>Name:</strong> ${student.name}</p>
        <p><strong>Grade:</strong> ${student.grade}</p>
        <p><strong>Age:</strong> ${student.age}</p>
        <p><strong>Email:</strong> <a href="mailto:${student.email}">${student.email}</a></p>
        <p><strong>Fees Status:</strong> ${fees}</p>
        <p><strong>Marks:</strong> ${student.marks !== null && student.marks !== undefined ? student.marks + ' %' : 'N/A'}</p>
        <p><strong>Result Status:</strong> ${result}</p>
        <p><strong>Today's Attendance:</strong> ${attendance}</p>
        <!-- Maybe add link to history modal from here too -->
        <button class="button-link view-history" style="margin-top: 1rem;" onclick="showAttendanceHistoryModal(${student.id})">View Attendance History</button>
        <br>
        <a href="#students" class="back-link">← Back to Student List</a>
    </section>`;
}
// ... (generateTeacherProfile, generateEditStudentForm, generateEditTeacherForm remain the same) ...
function generateTeacherProfile(teacher) {
    // (No changes needed here unless adding attendance for teachers)
    return `
    <section>
        <h2>Teacher Profile: ${teacher.name}</h2>
        <p><strong>ID:</strong> ${teacher.id}</p>
        <p><strong>Name:</strong> ${teacher.name}</p>
        <p><strong>Subject(s):</strong> ${teacher.subject}</p>
        <p><strong>Email:</strong> <a href="mailto:${teacher.email}">${teacher.email}</a></p>
        <p><strong>Phone:</strong> <a href="tel:${teacher.phone}">${teacher.phone}</a></p>
        <a href="#teachers" class="back-link">← Back to Teacher List</a>
    </section>`;
  }

  function generateEditStudentForm(student) {
    // Handle potential null/undefined marks for the input field default value
    const currentMarks = (student.marks !== null && student.marks !== undefined) ? student.marks : '';
    // (No changes needed for attendance here, usually edited separately)
    return `
    <h3>Edit Student: ${student.name}</h3>
    <form id="editStudentForm">
        <input type="hidden" id="editStudentId" value="${student.id}">

        <div>
            <label for="editStudentName">Name:</label>
            <input type="text" id="editStudentName" value="${student.name}" required>
        </div>
        <div>
            <label for="editStudentGrade">Grade:</label>
            <input type="text" id="editStudentGrade" value="${student.grade}" required>
        </div>
        <div>
            <label for="editStudentEmail">Email:</label>
            <input type="email" id="editStudentEmail" value="${student.email}" required>
        </div>
        <div>
            <label for="editStudentAge">Age:</label>
            <input type="number" id="editStudentAge" value="${student.age}" required min="5">
        </div>
        <div>
            <label for="editStudentMarks">Marks (%):</label>
            <input type="number" id="editStudentMarks" value="${currentMarks}" placeholder="Enter marks (0-100)" required min="0" max="100">
        </div>
        <div class="checkbox-label full-width">
             <input type="checkbox" id="editStudentFees" ${student.feesPaid ? 'checked' : ''}>
             <label for="editStudentFees">Fees Paid</label> <!-- Label associated with checkbox -->
        </div>

        <button type="submit" class="full-width">Save Changes</button>
    </form>`;
  }

  function generateEditTeacherForm(teacher) {
    // (No changes needed here)
    return `
    <h3>Edit Teacher: ${teacher.name}</h3>
    <form id="editTeacherForm">
        <input type="hidden" id="editTeacherId" value="${teacher.id}">

        <div>
            <label for="editTeacherName">Name:</label>
            <input type="text" id="editTeacherName" value="${teacher.name}" required>
        </div>
        <div>
            <label for="editTeacherSubject">Subject(s):</label>
            <input type="text" id="editTeacherSubject" value="${teacher.subject}" required>
        </div>
        <div>
             <label for="editTeacherEmail">Email:</label>
            <input type="email" id="editTeacherEmail" value="${teacher.email}" required>
        </div>
        <div>
            <label for="editTeacherPhone">Phone:</label>
            <input type="tel" id="editTeacherPhone" value="${teacher.phone}" required pattern="[0-9\\-]{10,15}" title="Enter a valid phone number (e.g., 555-123-4567)">
        </div>
        <button type="submit" class="full-width">Save Changes</button>
    </form>`;
  }

// --- Application Routes ---

const routes = {
    // ... (Keep #dashboard, #students, #teachers, #classes, #fees, #marks, #results as they were) ...
    '#dashboard': `
        <section>
            <h2>Dashboard</h2>
            <p>Welcome to the enhanced School Management System Dashboard.</p>
            <p>Use the navigation above to manage different aspects of the school. This demo showcases basic CRUD operations and section navigation using vanilla JavaScript.</p>
            <div style="display: flex; gap: 1rem; margin-top: 2rem; flex-wrap: wrap;">
                <div style="flex: 1; min-width: 200px; background-color: var(--primary-lighter); padding: 1.5rem; border-radius: var(--border-radius-md); text-align: center;">
                    <h3 style="color: var(--primary-darker); margin-bottom: 0.5rem;">Students</h3>
                    <p style="font-size: 2rem; font-weight: 600;">${studentData.length}</p>
                </div>
                 <div style="flex: 1; min-width: 200px; background-color: var(--secondary-lighter); padding: 1.5rem; border-radius: var(--border-radius-md); text-align: center;">
                    <h3 style="color: var(--secondary-darker); margin-bottom: 0.5rem;">Teachers</h3>
                    <p style="font-size: 2rem; font-weight: 600;">${teacherData.length}</p>
                </div>
                 <div style="flex: 1; min-width: 200px; background-color: var(--accent-lighter); padding: 1.5rem; border-radius: var(--border-radius-md); text-align: center;">
                    <h3 style="color: var(--accent-darker); margin-bottom: 0.5rem;">Classes</h3>
                    <p style="font-size: 2rem; font-weight: 600;">${classData.length}</p>
                </div>
            </div>
        </section>`,

    '#students': () => {
        const tableRows = studentData.map(s => `
            <tr>
                <td><a href="#student-${s.id}">${s.name}</a></td>
                <td>${s.grade}</td>
                <td>${s.age}</td>
                <td>${s.marks !== null && s.marks !== undefined ? s.marks + ' %' : 'N/A'}</td>
                <td>${getFeeStatus(s.feesPaid)}</td>
                <td>${getAttendanceStatusBadge(s.attendance)}</td> <!-- Added Attendance Status -->
                <td>
                    <div class="action-buttons">
                         <button class="edit" onclick="editStudent(${s.id})">Edit</button>
                         <button class="delete" onclick="deleteStudent(${s.id})">Delete</button>
                    </div>
                </td>
            </tr>`).join('');

        return `
        <section>
            <h2>Students</h2>
            <table>
                <thead><tr><th>Name</th><th>Grade</th><th>Age</th><th>Marks</th><th>Fees</th><th>Attendance</th><th>Actions</th></tr></thead>
                <tbody>${tableRows}</tbody>
            </table>
            ${studentData.length === 0 ? '<p style="text-align: center; color: var(--text-light);">No students found.</p>' : ''}

            <div id="editStudentContainer"></div>

            <h3>Add New Student</h3>
            <form id="addStudentForm">
                 <div>
                    <label for="addStudentName">Name:</label>
                    <input type="text" id="addStudentName" placeholder="Full Name" required>
                 </div>
                 <div>
                    <label for="addStudentGrade">Grade:</label>
                    <input type="text" id="addStudentGrade" placeholder="e.g., 10A" required>
                </div>
                <div>
                    <label for="addStudentEmail">Email:</label>
                    <input type="email" id="addStudentEmail" placeholder="student@example.com" required>
                </div>
                <div>
                    <label for="addStudentAge">Age:</label>
                    <input type="number" id="addStudentAge" placeholder="Age" required min="5">
                </div>
                 <div>
                    <label for="addStudentMarks">Marks (%):</label>
                    <input type="number" id="addStudentMarks" placeholder="0-100" min="0" max="100"> {/* Made optional on add */}
                </div>
                 <div class="checkbox-label full-width">
                     <input type="checkbox" id="addStudentFees">
                     <label for="addStudentFees">Fees Paid</label>
                 </div>
                <button type="submit" class="full-width">Add Student</button>
            </form>
        </section>`;
    },

    '#teachers': () => {
        // (No changes needed here)
        const tableRows = teacherData.map(t => `
            <tr>
                <td><a href="#teacher-${t.id}">${t.name}</a></td>
                <td>${t.subject}</td>
                 <td>${t.email}</td>
                 <td>${t.phone}</td>
                <td>
                     <div class="action-buttons">
                        <button class="edit" onclick="editTeacher(${t.id})">Edit</button>
                         <button class="delete" onclick="deleteTeacher(${t.id})">Delete</button>
                    </div>
                </td>
            </tr>`).join('');

        return `
        <section>
            <h2>Teachers</h2>
            <table>
                <thead><tr><th>Name</th><th>Subject(s)</th><th>Email</th><th>Phone</th><th>Actions</th></tr></thead>
                <tbody>${tableRows}</tbody>
            </table>
             ${teacherData.length === 0 ? '<p style="text-align: center; color: var(--text-light);">No teachers found.</p>' : ''}

            <div id="editTeacherContainer"></div>

            <h3>Add New Teacher</h3>
            <form id="addTeacherForm">
                <div>
                    <label for="addTeacherName">Name:</label>
                    <input type="text" id="addTeacherName" placeholder="Full Name" required>
                </div>
                <div>
                    <label for="addTeacherSubject">Subject(s):</label>
                    <input type="text" id="addTeacherSubject" placeholder="e.g., Mathematics, Physics" required>
                </div>
                <div>
                    <label for="addTeacherEmail">Email:</label>
                    <input type="email" id="addTeacherEmail" placeholder="teacher@school.edu" required>
                </div>
                <div>
                     <label for="addTeacherPhone">Phone:</label>
                    <input type="tel" id="addTeacherPhone" placeholder="e.g., 555-123-4567" required pattern="[0-9\\-]{10,15}" title="Enter a valid phone number">
                </div>
                <button type="submit" class="full-width">Add Teacher</button>
            </form>
        </section>`;
    },

    '#classes': () => {
        // (No changes needed here)
        const tableRows = classData.map(c => `
            <tr>
                <td>${c.name}</td>
                <td>${c.room}</td>
                <td>${getTeacherNameById(c.teacherId)} (ID: ${c.teacherId})</td>
                <td>${c.schedule}</td>
                 <td>
                     <div class="action-buttons">
                        <button class="edit" onclick="editClass(${c.id})">Edit</button>
                    </div>
                </td>
            </tr>`).join('');
        return `
            <section>
                <h2>Classes</h2>
                <table>
                     <thead><tr><th>Class Name</th><th>Room</th><th>Teacher</th><th>Schedule</th><th>Actions</th></tr></thead>
                     <tbody>${tableRows}</tbody>
                </table>
                ${classData.length === 0 ? '<p style="text-align: center; color: var(--text-light);">No classes defined.</p>' : ''}

                 <h3>Add New Class (Placeholder)</h3>
                 <form id="addClassForm" onsubmit="handleAddClassSubmit(event)">
                    <div><label>Class Name:</label><input type="text" placeholder="e.g., Grade 7C" required></div>
                    <div><label>Room No:</label><input type="text" placeholder="e.g., 305" required></div>
                    <div><label>Teacher ID:</label><input type="number" placeholder="Teacher's ID" required></div>
                    <div><label>Schedule:</label><input type="text" placeholder="e.g., Mon/Wed 10:00 AM" required></div>
                    <button type="submit" class="full-width">Add Class</button>
                 </form>
            </section>`;
    },

    '#fees': () => {
        // (No changes needed here)
        const tableRows = studentData.map(s => `
            <tr>
                <td><a href="#student-${s.id}">${s.name}</a></td>
                <td>${s.grade}</td>
                <td>${getFeeStatus(s.feesPaid)}</td>
                 <td>
                     <div class="action-buttons">
                         <button class="toggle-fee" onclick="toggleFeeStatus(${s.id})">Toggle Paid</button>
                         <button class="edit" onclick="sendFeeReminder(${s.id})">Send Reminder</button> {/* Calls verified function */}
                    </div>
                </td>
            </tr>`).join('');
         return `
            <section>
                <h2>Fee Management</h2>
                 <p>Overview of student fee payment status.</p>
                <table>
                     <thead><tr><th>Student Name</th><th>Grade</th><th>Status</th><th>Actions</th></tr></thead>
                     <tbody>${tableRows}</tbody>
                </table>
                 ${studentData.length === 0 ? '<p style="text-align: center; color: var(--text-light);">No student data for fees.</p>' : ''}

                 <h3>Record Bulk Payment (Placeholder)</h3>
                 <form id="bulkFeeForm" onsubmit="handleBulkFeeSubmit(event)">
                    <div><label>Select Grade:</label><input type="text" placeholder="e.g., Grade 9"></div>
                    <div><label>Payment Date:</label><input type="date"></div>
                    <button type="submit" class="full-width">Record Payment</button>
                 </form>
            </section>`;
    },

    '#marks': () => {
         // (No changes needed here)
         const tableRows = studentData.map(s => `
            <tr>
                <td><a href="#student-${s.id}">${s.name}</a></td>
                <td>${s.grade}</td>
                 <td>${s.marks !== null && s.marks !== undefined ? s.marks + ' %' : 'N/A'}</td> {/* Display N/A if no marks */}
                 <td>
                     <div class="action-buttons">
                         <button class="evaluate" onclick="editStudent(${s.id})">Update Marks</button> {/* Calls verified function */}
                         <button class="edit" onclick="viewStudentMarksDetails(${s.id})">View Details</button>
                    </div>
                </td>
            </tr>`).join('');
         return `
            <section>
                <h2>Marks Evaluation</h2>
                <p>View and update student marks.</p>
                <table>
                     <thead><tr><th>Student Name</th><th>Grade</th><th>Current Marks</th><th>Actions</th></tr></thead>
                     <tbody>${tableRows}</tbody>
                </table>
                 ${studentData.length === 0 ? '<p style="text-align: center; color: var(--text-light);">No student data for marks.</p>' : ''}

                 <div id="editStudentContainer"></div> {/* Container for edit form */}

                 <h3>Batch Update Marks (Placeholder)</h3>
                 <form id="batchMarksForm" onsubmit="handleBatchMarksSubmit(event)">
                    <div><label>Select Class:</label><input type="text" placeholder="e.g., Grade 10A"></div>
                    <div><label>Subject:</label><input type="text" placeholder="e.g., Mathematics"></div>
                    <div><label>Assessment:</label><input type="text" placeholder="e.g., Midterm Exam"></div>
                    <button type="submit" class="full-width">Start Batch Update</button>
                 </form>
            </section>`;
    },

    '#results': () => {
        // (No changes needed here)
        const tableRows = studentData.map(s => `
            <tr>
                <td><a href="#student-${s.id}">${s.name}</a></td>
                <td>${s.grade}</td>
                <td>${s.marks !== null && s.marks !== undefined ? s.marks + ' %' : 'N/A'}</td>
                <td>${getResultStatus(s.marks)}</td>
                 <td>
                     <div class="action-buttons">
                         <button class="edit" onclick="generateReportCard(${s.id})">Report Card</button> {/* Calls updated function */}
                    </div>
                </td>
            </tr>`).join('');
         return `
            <section>
                <h2>Results</h2>
                <p>Overview of student results based on marks.</p>
                 <table>
                     <thead><tr><th>Student Name</th><th>Grade</th><th>Marks</th><th>Status</th><th>Actions</th></tr></thead>
                     <tbody>${tableRows}</tbody>
                </table>
                 ${studentData.length === 0 ? '<p style="text-align: center; color: var(--text-light);">No student data for results.</p>' : ''}
            </section>`;
    },

    '#attendance': () => {
        const today = getCurrentDateString();

        const tableRows = studentData.map(s => `
            <tr data-student-id="${s.id}">
                <td><a href="#student-${s.id}">${s.name}</a></td>
                <td>${s.grade}</td>
                <td class="attendance-status">${getAttendanceStatusBadge(s.attendance)}</td>
                <td>
                    <div class="action-buttons">
                        <button
                            class="mark-present ${s.attendance === 'Present' ? 'active-status' : ''}"
                            onclick="markAttendance(${s.id}, 'Present')">
                            Present
                        </button>
                        <button
                            class="mark-absent ${s.attendance === 'Absent' ? 'active-status' : ''}"
                            onclick="markAttendance(${s.id}, 'Absent')">
                            Absent
                        </button>
                        <button
                            class="mark-late ${s.attendance === 'Late' ? 'active-status' : ''}"
                            onclick="markAttendance(${s.id}, 'Late')">
                            Late
                        </button>
                         <!-- <<< New History Button >>> -->
                         <button class="view-history" onclick="showAttendanceHistoryModal(${s.id})">
                             History
                         </button>
                    </div>
                </td>
            </tr>`).join('');

        return `
            <section>
                <h2>Attendance</h2>
                <p class="attendance-date">Date: ${today}</p>
                <p>Mark student attendance for today or view history.</p>
                <table>
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Grade</th>
                            <th>Today's Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>${tableRows}</tbody>
                </table>
                ${studentData.length === 0 ? '<p style="text-align: center; color: var(--text-light);">No students found.</p>' : ''}
            </section>
        `;
      },
};

// --- Core Application Logic ---
// ... (setActiveNavLink, renderRoute, attachFormListeners remain mostly the same) ...
function setActiveNavLink(hash) {
    document.querySelectorAll('nav a').forEach(link => {
        const linkHash = link.getAttribute('href');
        link.classList.remove('active');

        // Direct match
        if (linkHash === hash) {
            link.classList.add('active');
        }
        // Highlight parent section if viewing a profile
        else if (hash.startsWith('#student-') && linkHash === '#students') {
            link.classList.add('active');
        } else if (hash.startsWith('#teacher-') && linkHash === '#teachers') {
            link.classList.add('active');
        }
        // Highlight parent section if editing (specific forms)
        else if (document.getElementById('editStudentForm')) {
             if(linkHash === '#students' || linkHash === '#marks') { // Highlight for both sections where edit appears
                 link.classList.add('active');
             }
        }
        else if (document.getElementById('editTeacherForm')) {
             if(linkHash === '#teachers') link.classList.add('active');
        }
        // Add other specific parent highlights if needed
    });
  }

  function renderRoute() {
    const app = document.getElementById('app');
    const hash = window.location.hash || '#dashboard';

    // Fade out content
    app.style.opacity = 0;

    // Clear previous edit forms specifically - check on ALL sections now
    const editStudentContainers = document.querySelectorAll('#editStudentContainer');
    editStudentContainers.forEach(c => c.innerHTML = '');
    const editTeacherContainers = document.querySelectorAll('#editTeacherContainer');
    editTeacherContainers.forEach(c => c.innerHTML = '');


    // Render content based on hash
    let content = '';
    if (hash.startsWith('#student-')) {
        const id = parseInt(hash.split('-')[1]);
        const student = studentData.find(s => s.id === id);
        content = student ? generateStudentProfile(student) : '<section><h2>Error</h2><p>Student Not Found</p></section>';
    } else if (hash.startsWith('#teacher-')) {
        const id = parseInt(hash.split('-')[1]);
        const teacher = teacherData.find(t => t.id === id);
        content = teacher ? generateTeacherProfile(teacher) : '<section><h2>Error</h2><p>Teacher Not Found</p></section>';
    } else {
        const contentGenerator = routes[hash]; // Handles #attendance now too
        content = typeof contentGenerator === 'function' ? contentGenerator() : contentGenerator;
        content = content || '<section><h2>404 - Page Not Found</h2><p>The requested page does not exist.</p></section>';
    }

    // Use a short timeout to allow the opacity transition to start before changing content
    setTimeout(() => {
        app.innerHTML = content;

        // Update active nav link after content is rendered
        setActiveNavLink(hash);

        // Re-attach crucial form listeners after rendering if needed (some are inline now)
        attachFormListeners();

        // Scroll to top after rendering
        window.scrollTo(0, 0);

        // Fade in new content
        app.style.opacity = 1;

    }, 150); // Match transition duration slightly
  }


  function attachFormListeners() {
    // Add Student Form
    const addStudentForm = document.getElementById('addStudentForm');
    if (addStudentForm) {
        addStudentForm.addEventListener('submit', handleAddStudentSubmit);
    }

    // Add Teacher Form
    const addTeacherForm = document.getElementById('addTeacherForm');
    if (addTeacherForm) {
        addTeacherForm.addEventListener('submit', handleAddTeacherSubmit);
    }

    // Edit Student Form (Listener attached dynamically in editStudent)
    const editStudentForm = document.getElementById('editStudentForm');
    if (editStudentForm && !editStudentForm.hasAttribute('data-listener-attached')) {
        editStudentForm.addEventListener('submit', handleEditStudentSubmit);
         editStudentForm.setAttribute('data-listener-attached', 'true'); // Prevent duplicate listeners
    }

    // Edit Teacher Form (Listener attached dynamically in editTeacher)
    const editTeacherForm = document.getElementById('editTeacherForm');
    if (editTeacherForm && !editTeacherForm.hasAttribute('data-listener-attached')) {
        editTeacherForm.addEventListener('submit', handleEditTeacherSubmit);
        editTeacherForm.setAttribute('data-listener-attached', 'true'); // Prevent duplicate listeners
    }

    // Other forms have inline listeners (onsubmit)
  }

// --- CRUD Handlers ---
// ... (handleAddStudentSubmit, handleAddTeacherSubmit, editStudent, editTeacher, handleEditStudentSubmit, handleEditTeacherSubmit, deleteStudent, deleteTeacher remain the same) ...
// ADD
function handleAddStudentSubmit(e) {
    e.preventDefault();
    try {
        const name = document.getElementById('addStudentName').value.trim();
        const grade = document.getElementById('addStudentGrade').value.trim();
        const email = document.getElementById('addStudentEmail').value.trim();
        const age = parseInt(document.getElementById('addStudentAge').value);
        // Handle optional marks input
        const marksInput = document.getElementById('addStudentMarks').value;
        const marks = marksInput.trim() === '' ? null : parseInt(marksInput); // Store null if empty
        const feesPaid = document.getElementById('addStudentFees').checked;

        if (!name || !grade || !email || isNaN(age) || age < 5 || (marks !== null && (isNaN(marks) || marks < 0 || marks > 100))) {
             throw new Error('Invalid input. Please check Name, Grade, Email, Age, and Marks (if entered).');
        }

        // Add new student with default attendance and empty history
        studentData.push({
            name, grade, email, age, marks, feesPaid,
            id: Date.now(),
            attendance: 'Pending', // Default today's attendance
            attendanceHistory: {} // Initialize empty history
        });
        // Go to the relevant page (students or attendance) after adding
        if(window.location.hash === '#attendance') {
            renderRoute(); // Re-render attendance if already there
        } else {
            window.location.hash = '#students'; // Default go to students list
        }
    } catch (error) {
        alert(Error adding student: ${error.message});
    }
}

function handleAddTeacherSubmit(e) {
    e.preventDefault();
     try {
        const name = document.getElementById('addTeacherName').value.trim();
        const subject = document.getElementById('addTeacherSubject').value.trim();
        const email = document.getElementById('addTeacherEmail').value.trim();
        const phone = document.getElementById('addTeacherPhone').value.trim();

         if (!name || !subject || !email || !phone) {
             throw new Error('Invalid input. Please check all fields.');
        }
         // Basic email validation (optional)
        if (!/\S+@\S+\.\S+/.test(email)) {
            throw new Error('Invalid email format.');
        }
        // Basic phone validation (optional - adjust regex as needed)
         if (!/^[0-9\-+\s()]{7,20}$/.test(phone)) {
             throw new Error('Invalid phone number format.');
         }

        teacherData.push({ name, subject, email, phone, id: Date.now() });
        window.location.hash = '#teachers'; // Go to teachers list
     } catch (error) {
         alert(Error adding teacher: ${error.message});
     }
  }

// EDIT (Show Form)
function editStudent(id) {
    const student = studentData.find(s => s.id === id);
     if (!student) {
          alert("Error: Student not found.");
          return;
     }

    // Decide where to show the form.
    const currentHash = window.location.hash;
    let containerId = null;

    // Edit form should appear in Students and Marks sections
    if (currentHash === '#students' || currentHash === '#marks') {
          containerId = 'editStudentContainer'; // Use the container ID present in both sections
    } else {
        // If called from somewhere unexpected, navigate to students page first
        console.warn("editStudent called from unexpected page:", currentHash, ". Redirecting to #students.");
        window.location.hash = '#students';
        // Re-rendering will happen due to hash change, maybe try again after redirect
        return;
    }

    const container = document.getElementById(containerId);
    if (!container) {
         console.error(Container #${containerId} not found for editing student in hash ${currentHash}.);
         alert(Error: Could not find the area to display the edit form.);
         return;
    }

    container.innerHTML = generateEditStudentForm(student);
    // Ensure the correct form listener is attached after injecting HTML
    attachFormListeners(); // Call the central function to attach if needed

    container.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // Re-apply active link styling to the current page after showing form
    // This relies on setActiveNavLink logic handling form visibility
    setActiveNavLink(currentHash);
  }

  function editTeacher(id) {
    const teacher = teacherData.find(t => t.id === id);
    if (!teacher) {
        alert("Error: Teacher not found.");
        return;
    }
    // Assume this is only called from #teachers page
    const container = document.getElementById('editTeacherContainer');
    if (!container) {
          console.error(Container #editTeacherContainer not found for editing teacher.);
          alert(Error: Could not find the area to display the edit form.);
          return;
     }

    container.innerHTML = generateEditTeacherForm(teacher);
     // Ensure the correct form listener is attached after injecting HTML
     attachFormListeners(); // Call the central function to attach if needed

    container.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setActiveNavLink('#teachers'); // Ensure teachers nav stays active
  }

// EDIT (Handle Submit)
function handleEditStudentSubmit(e) {
    e.preventDefault();
     try {
        const id = parseInt(document.getElementById('editStudentId').value);
        const studentIndex = studentData.findIndex(s => s.id === id);
        if (studentIndex === -1) throw new Error('Student not found for editing.');

        const name = document.getElementById('editStudentName').value.trim();
        const grade = document.getElementById('editStudentGrade').value.trim();
        const email = document.getElementById('editStudentEmail').value.trim();
        const age = parseInt(document.getElementById('editStudentAge').value);
        // Handle potentially empty marks input during edit
        const marksInput = document.getElementById('editStudentMarks').value;
        const marks = marksInput.trim() === '' ? null : parseInt(marksInput);
        const feesPaid = document.getElementById('editStudentFees').checked;

         if (!name || !grade || !email || isNaN(age) || age < 5 || (marks !== null && (isNaN(marks) || marks < 0 || marks > 100))) {
            throw new Error('Invalid input. Please check Name, Grade, Email, Age, and Marks (must be 0-100 if entered).');
        }

        // Update student data, keeping existing attendance status and history
        studentData[studentIndex] = {
            ...studentData[studentIndex], // Keep existing fields like ID, attendance, attendanceHistory
            name, grade, email, age, marks, feesPaid
        };
        renderRoute(); // Re-render the current view
     } catch (error) {
         alert(Error saving student: ${error.message});
     }
  }

  function handleEditTeacherSubmit(e) {
    e.preventDefault();
    try {
        const id = parseInt(document.getElementById('editTeacherId').value);
        const teacherIndex = teacherData.findIndex(t => t.id === id);
        if (teacherIndex === -1) throw new Error('Teacher not found for editing.');

        const name = document.getElementById('editTeacherName').value.trim();
        const subject = document.getElementById('editTeacherSubject').value.trim();
        const email = document.getElementById('editTeacherEmail').value.trim();
        const phone = document.getElementById('editTeacherPhone').value.trim();

         if (!name || !subject || !email || !phone) {
             throw new Error('Invalid input. Please check all fields.');
         }
         if (!/\S+@\S+\.\S+/.test(email)) {
            throw new Error('Invalid email format.');
        }
          // Basic phone validation (optional - adjust regex as needed)
         if (!/^[0-9\-+\s()]{7,20}$/.test(phone)) {
             throw new Error('Invalid phone number format.');
         }

        teacherData[teacherIndex] = {
            ...teacherData[teacherIndex],
            name, subject, email, phone
        };
        renderRoute(); // Re-render teacher list
     } catch (error) {
         alert(Error saving teacher: ${error.message});
     }
  }

// DELETE (Simple Confirmation)
function deleteStudent(id) {
    const student = studentData.find(s => s.id === id);
    if (!student) return;
    if (confirm(Are you sure you want to delete student: ${student.name}? This cannot be undone.)) {
        const studentIndex = studentData.findIndex(s => s.id === id);
        if (studentIndex > -1) {
            studentData.splice(studentIndex, 1);
            // If viewing the profile being deleted, navigate away first
            if (window.location.hash === #student-${id}) {
                 window.location.hash = '#students'; // Go back to list
                 // Re-render will happen due to hash change
            } else {
                renderRoute(); // Re-render the current list view
            }
            console.log(Deleted student ID ${id});
        }
    }
  }

  function deleteTeacher(id) {
     const teacher = teacherData.find(t => t.id === id);
    if (!teacher) return;
    if (confirm(Are you sure you want to delete teacher: ${teacher.name}? This cannot be undone.)) {
        const teacherIndex = teacherData.findIndex(t => t.id === id);
        if (teacherIndex > -1) {
            teacherData.splice(teacherIndex, 1);
            // If viewing the profile being deleted, navigate away first
             if (window.location.hash === #teacher-${id}) {
                 window.location.hash = '#teachers'; // Go back to list
                  // Re-render will happen due to hash change
             } else {
                renderRoute(); // Re-render the current list view
             }
             console.log(Deleted teacher ID ${id});
        }
    }
  }


// --- Action Handlers for Specific Sections ---
// ... (Classes, Fee Management, Marks Evaluation, Results remain the same) ...
// Classes
function editClass(id) {
    alert(Edit Class ID ${id} - Feature Not Implemented Yet.);
}
function handleAddClassSubmit(event) {
    event.preventDefault();
    alert(Add New Class - Feature Not Implemented Yet.);
    // event.target.reset(); // Optionally reset form
}

// Fee Management
function toggleFeeStatus(id) { // Verified: Works correctly
   const studentIndex = studentData.findIndex(s => s.id === id);
   if (studentIndex > -1) {
       studentData[studentIndex].feesPaid = !studentData[studentIndex].feesPaid;
       console.log(Toggled fee status for student ID ${id}. Fees Paid: ${studentData[studentIndex].feesPaid});
       renderRoute(); // Re-render the current view (#fees) to show updated status
   } else {
        console.error(Student with ID ${id} not found for toggling fee status.);
        alert(Error: Student with ID ${id} not found.);
   }
}
function sendFeeReminder(id) { // Verified: Works correctly with confirmation
    const student = studentData.find(s => s.id === id);
    if (!student) {
        alert(Error: Student with ID ${id} not found.);
        console.error(Student with ID ${id} not found when trying to send reminder.);
        return;
    }

    if (student.feesPaid) {
        alert(${student.name}'s fees are already marked as paid. No reminder needed.);
        console.log(Fee reminder attempt for ${student.name} (ID: ${id}) - Skipped (Fees Paid).);
    } else {
        if (confirm(Send a fee reminder to ${student.name} (Email: ${student.email})?)) {
             alert(Reminder Sent (Simulated)!\nA fee reminder notification would be sent to ${student.name}.);
            console.log(Fee reminder action confirmed for student ID ${id}, Name: ${student.name});
        } else {
            console.log(Fee reminder action cancelled by user for student ID ${id}.);
        }
    }
}
function handleBulkFeeSubmit(event) { // Placeholder
    event.preventDefault();
    alert(Record Bulk Payment - Feature Not Implemented Yet.);
    // event.target.reset(); // Optionally reset form
}

// Marks Evaluation
function viewStudentMarksDetails(id) { // Verified: Navigates to student profile
     window.location.hash = #student-${id};
}
function handleBatchMarksSubmit(event) { // Placeholder
     event.preventDefault();
    alert(Batch Update Marks - Feature Not Implemented Yet.);
    // event.target.reset(); // Optionally reset form
}
// Note: "Update Marks" button calls editStudent(id), which is handled under EDIT section

// Results
function generateReportCard(id) { // Updated for better simulation
     const student = studentData.find(s => s.id === id);
    if (student) {
        const marksInfo = (student.marks !== null && student.marks !== undefined) ? ${student.marks}% : 'Not Available';
        const resultStatus = getResultStatus(student.marks); // Get the HTML badge
        // Basic alert simulation (remove HTML for alert)
        const resultStatusText = resultStatus.replace(/<[^>]*>/g, ''); // Strip HTML tags for alert

        alert(
            --- Report Card Summary (Simulated) ---\n +
            Student: ${student.name} (ID: ${id})\n +
            Grade: ${student.grade}\n +
            Marks: ${marksInfo}\n +
            Status: ${resultStatusText}\n\n+
            (Full report card generation not implemented)
        );
        console.log(Generated report card summary (simulated) for student ID ${id});
    } else {
         alert(Error: Student ID ${id} not found.);
         console.error(Student ID ${id} not found for generating report card.);
    }
}


// --- Attendance Specific Actions ---
function markAttendance(studentId, status) { // Marks TODAY's attendance
    console.log(Attempting to mark student ${studentId} as ${status} for today);
    const studentIndex = studentData.findIndex(s => s.id === studentId);

    if (studentIndex > -1) {
        studentData[studentIndex].attendance = status; // Update today's status
        console.log(Updated today's attendance for ${studentData[studentIndex].name} to ${status});

        // Re-render the attendance route to show the updated status and button highlighting
        if (window.location.hash === '#attendance') {
            renderRoute();
        } else {
            console.warn("Today's attendance marked, but not currently on the #attendance page.");
        }
    } else {
        console.error(Student with ID ${studentId} not found for marking today's attendance.);
        alert(Error: Student with ID ${studentId} not found.);
    }
}

// <<< New Function: Show Attendance History Modal >>>
function showAttendanceHistoryModal(studentId) {
    const student = studentData.find(s => s.id === studentId);
    if (!student) {
        alert('Error: Student not found.');
        return;
    }

    const modal = document.getElementById('attendanceHistoryModal');
    const studentNameEl = document.getElementById('modalStudentName');
    const monthYearEl = document.getElementById('modalMonthYear');
    const historyContentEl = document.getElementById('modalHistoryContent');

    // Get dates for the previous month
    const { year, month, dates } = getPreviousMonthDates();
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
    const monthName = monthNames[month];

    studentNameEl.textContent = Attendance History: ${student.name};
    monthYearEl.textContent = Month: ${monthName} ${year};

    // Generate grid items for each day
    let historyHtml = '';
    dates.forEach(dateString => {
        const currentStatus = student.attendanceHistory?.[dateString] || 'Pending'; // Default to Pending if no record
        const displayDate = formatDateForDisplay(dateString);

        historyHtml += `
            <div class="history-day-item" data-date="${dateString}">
                <div class="date">${displayDate}</div>
                <div class="status-badge">${getAttendanceStatusBadge(currentStatus)}</div>
                <select onchange="updatePastAttendance(${studentId}, '${dateString}', this.value)">
                    <option value="Pending" ${currentStatus === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option value="Present" ${currentStatus === 'Present' ? 'selected' : ''}>Present</option>
                    <option value="Absent" ${currentStatus === 'Absent' ? 'selected' : ''}>Absent</option>
                    <option value="Late" ${currentStatus === 'Late' ? 'selected' : ''}>Late</option>
                </select>
            </div>
        `;
    });

    historyContentEl.innerHTML = historyHtml || '<p>No history data available for this month.</p>';
    modal.style.display = 'block';
}

// <<< New Function: Close Attendance History Modal >>>
function closeAttendanceHistoryModal() {
    const modal = document.getElementById('attendanceHistoryModal');
    modal.style.display = 'none';
    // Optional: Clear content if needed when closing
    // document.getElementById('modalHistoryContent').innerHTML = '';
}

// <<< New Function: Update Past Attendance >>>
function updatePastAttendance(studentId, dateString, newStatus) {
    console.log(Updating student ${studentId} attendance for ${dateString} to ${newStatus});
    const studentIndex = studentData.findIndex(s => s.id === studentId);

    if (studentIndex > -1) {
        // Ensure the history object exists
        if (!studentData[studentIndex].attendanceHistory) {
            studentData[studentIndex].attendanceHistory = {};
        }
        // Update the specific date's status
        studentData[studentIndex].attendanceHistory[dateString] = newStatus;
        console.log(Updated history for ${studentData[studentIndex].name} on ${dateString} to ${newStatus});

        // --- Update the specific badge in the modal without full redraw ---
        const modal = document.getElementById('attendanceHistoryModal');
        if (modal && modal.style.display === 'block') {
            const dayItem = modal.querySelector(.history-day-item[data-date="${dateString}"]);
            if (dayItem) {
                const badgeContainer = dayItem.querySelector('.status-badge');
                if (badgeContainer) {
                    badgeContainer.innerHTML = getAttendanceStatusBadge(newStatus);
                } else {
                     console.warn("Could not find badge container to update in modal for", dateString);
                }
            } else {
                console.warn("Could not find day item in modal for", dateString);
            }
        }
        // --- End specific badge update ---

    } else {
        console.error(Student with ID ${studentId} not found for updating past attendance.);
        // Optionally show an error to the user
    }
}

// --- Login Handler ---
// ... (handleLogin remains the same) ...
function handleLogin(e) {
    e.preventDefault();
    const user = document.getElementById('username').value.trim().toLowerCase();
    const pass = document.getElementById('password').value.trim();
    const loginForm = document.getElementById('loginForm');
    let errorMsg = loginForm.querySelector('.error-message');

    // Simple hardcoded check
    if (user === 'admin' && pass === 'admin') {
        if (errorMsg) errorMsg.remove(); // Remove error if login is successful
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('mainApp').style.display = 'flex'; // Use 'flex' for main layout
        window.location.hash = '#dashboard'; // Go to dashboard after login
        renderRoute(); // Render the initial view
    } else {
        if (!errorMsg) {
            errorMsg = document.createElement('p');
            errorMsg.classList.add('error-message'); // Use class for styling
             // Insert after button or specific element
            const button = loginForm.querySelector('button[type="submit"]');
            if (button) {
              button.insertAdjacentElement('afterend', errorMsg);
            } else {
              loginForm.appendChild(errorMsg); // Fallback append
            }
        }
        errorMsg.textContent = 'Invalid credentials. Please try again.';
        document.getElementById('password').value = ''; // Clear password field
        document.getElementById('password').focus(); // Focus password field
    }
  }

// --- Initial Setup ---

document.getElementById('loginForm').addEventListener('submit', handleLogin);
window.addEventListener('hashchange', renderRoute);

// Initial check on load & close modal on overlay click
window.addEventListener('load', () => {
   if (document.getElementById('loginContainer').style.display === 'none') {
       document.getElementById('mainApp').style.display = 'flex'; // Use flex
       renderRoute();
   } else {
       document.getElementById('mainApp').style.display = 'none';
   }

   // Add listener to close modal if user clicks outside the content area
   const modal = document.getElementById('attendanceHistoryModal');
   window.onclick = function(event) {
       if (event.target == modal) {
           closeAttendanceHistoryModal();
       }
   }
});

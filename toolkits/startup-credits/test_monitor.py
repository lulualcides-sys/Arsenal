import unittest
import monitor

A = '<html><style>credits irrelevant noise</style><p>Startups get $1000 in credits here</p><p>Business eligibility rules apply</p><div>Apply for credits online</div></html>'
B = A.replace('$1000', '$2000')
P = [{'id':'test','name':'Sample Program','url':'https://example.org'}]

class MonitorTests(unittest.TestCase):
    def test_first_scan_is_baseline_not_news(self):
        state, changes, errors, checked = monitor.scan(P, {}, lambda url:A)
        self.assertEqual(changes, [])
        self.assertEqual(checked, ['Sample Program'])
        self.assertFalse(errors)
        self.assertIn('sha256',state['test'])
    def test_identifies_change(self):
        before, *_ = monitor.scan(P, {}, lambda url:A)
        after, changes, errors, checked = monitor.scan(P, before, lambda url:B)
        self.assertEqual(len(changes),1)
        self.assertNotEqual(after['test']['sha256'],before['test']['sha256'])
    def test_error_does_not_erase_state(self):
        before, *_ = monitor.scan(P, {}, lambda url:A)
        def fail(url): raise OSError('network')
        after, changes, errors, checked = monitor.scan(P, before, fail)
        self.assertEqual(after,before)
        self.assertEqual(changes,[])
        self.assertEqual(len(errors),1)
    def test_ignores_script_data(self):
        page = A.replace('</html>','<script>Fake $500k credits</script></html>')
        self.assertNotIn('Fake $500k credits',monitor.fragments(page))

if __name__ == '__main__':
    unittest.main()

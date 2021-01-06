<script>
export default {
  middleware ({ redirect, route }) {
    if (!route.params.subjectCategory) {
      return redirect({
        name: `${route.name}-subjectCategory`,
        params: { subjectCategory: '1' }
      })
    }
  }
}
</script>

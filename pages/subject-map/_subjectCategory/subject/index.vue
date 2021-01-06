<script>
export default {
  middleware ({ redirect, route }) {
    if (!route.params.category && route.params.subjectCategory) {
      return redirect({
        name: `${route.name}-category`,
        params: { category: '1', subjectCategory: route.params.subjectCategory }
      })
    }
  }
}
</script>
